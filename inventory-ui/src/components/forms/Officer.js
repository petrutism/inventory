import {Field, Form, Formik} from "formik";
import {Alert, Button, CircularProgress, Stack, Typography} from "@mui/material";
import * as Yup from 'yup';
import FormTextInput from "./FormTextInput";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import {useEffect, useState} from "react";
import {getCities, getOfficerById, getRoomNumbers, getRooms, saveOfficer, updateOfficer} from "../api/inventoryApi";
import {useParams, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";


const Officer = () => {
    const [notification, setNotification] = useState({isVisible: false});
    const [citiesLoading, setCitiesLoading] = useState(true);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [roomNumbers, setRoomNumbers] = useState([]);
    const [officerLoading, setOfficerLoading] = useState(true);
    const navigation = useNavigate();
    const {officerId} = useParams();
    const [officer, setOfficer] = useState({
        name: '',
        surname: '',
        room: {
            city: '',
            roomNumber: '',
        },
    });
    const {t} = useTranslation('officer');

    const officerValidationSchema = Yup.object().shape(
        {
            name: Yup.string()
                .min(5, t('validationNameMin'))
                .max(20, t('validationNameMax'))
                .required(t('validationNameRequired')),
            surname: Yup.string()
                .min(5, t('validationSurnameMin'))
                .max(20, t('validationSurnameMax'))
                .required(t('validationSurnameRequired'))
        }
    );


    useEffect(() => {

        if (!officerId) {
            setOfficerLoading(false);

            return;
        }

        getOfficerById(officerId)
            .then(({data}) => setOfficer(data))
            .catch((err) => console.log('officer error', err))
            .finally(() => setOfficerLoading(false));

    }, []);

    const onFormSubmit = (values, helper) => {
        values.city = selectedCity;

        roomNumbers.forEach(r => {
            if (r.city === selectedCity && r.roomNumber === values.selectedRoom) {
                values.room = r;
            }
        });

        console.log('officer values', values);
        console.log('officer helpers', helper);

        const officerFromForm = {
            name: values.name,
            surname: values.surname,
            room: values.room
        };
        if (officerId) {
            onOfficerUpdate(officerFromForm, helper);
            return;
        }

        onCreateOfficer(officerFromForm, helper);
    }
    const onCreateOfficer = (officerFromForm, helper) => {
        saveOfficer(officerFromForm)
            .then((response) => {
                helper.resetForm();
                setNotification({isVisible: true, message: t('successMessage'), severity: 'success'});
            })
            .catch((error) => {
                setNotification({isVisible: true, message: t('errorMessage'), severity: 'error'});
                console.log(error);
            })
            .finally(() => helper.setSubmitting(false));
    }
    const onOfficerUpdate = (officerFromForm, helper) => {
        updateOfficer(officerFromForm, officerId)
            .then(() => navigation(`/officers/id/${officerId}`))
            .catch((error) => setNotification({
                isVisible: true,
                message: t('updateErrorMessage'),
                severity: 'error'
            }))
            .finally(() => helper.setSubmitting(false));
    }
    const handleCityChange = (event) => {

        setSelectedCity(event.target.value);

        getRoomNumbers(event.target.value)
            .then(({data}) => {
                setRoomNumbers(data);
            })
            .finally(() => {
                console.log('roomNumbers', roomNumbers);
            });
    };

    useEffect(() => {
        const citiesFromBackend = [];
        getCities()
            .then(({data}) => {
                data.map((c) => {
                    citiesFromBackend.push({
                        value: `${c}`,
                        label: `${c}`,
                    })
                });
                setCities(citiesFromBackend);
            })
            .catch((error) => console.log('cities error', error))
            .finally(() => {
                setCitiesLoading(false);
                console.log('citiesFromBackend', citiesFromBackend);
            });
    }, []);

    return (
        <>
            {
                citiesLoading ? <CircularProgress/> :
                    <Formik
                        initialValues={{
                            name: officer.name,
                            surname: officer.surname,
                            city: officer.room.city,
                            room: officer.room.roomNumber,
                            selectedRoom: ''
                        }}

                        onSubmit={onFormSubmit}
                        validationSchema={officerValidationSchema}
                    >
                        {props => (
                            <Form>
                                <Stack spacing={1} direction="column">
                                    {notification.isVisible &&
                                        <Alert severity={notification.severity}>{notification.message}</Alert>}
                                    <Typography
                                        variant="h5">{officerId ? t('updateOfficer') : t('createOfficer')}</Typography>
                                    <FormTextInput error={props.touched.name && !!props.errors.name}
                                                   name="name"
                                                   label={t('labelName')}/>
                                    <FormTextInput error={props.touched.surname && !!props.errors.surname}
                                                   name="surname"
                                                   label={t('labelSurname')}/>
                                    <Stack spacing={1} direction="row">
                                        <Field
                                            sx={{minWidth: '200px'}}
                                            id="city"
                                            name="city"
                                            value={selectedCity}
                                            as={TextField}
                                            select
                                            label={t('labelSelectCity')}
                                            onChange={handleCityChange}
                                        >
                                            {cities.map((c) => (<MenuItem key={c.value} value={c.value}>
                                                {c.label}
                                            </MenuItem>))}
                                        </Field>

                                        <Field
                                            sx={{minWidth: '200px'}}
                                            id="selectedRoom"
                                            name="selectedRoom"
                                            as={TextField}
                                            select
                                            label={t('labelSelectRoom')}
                                        >
                                            {roomNumbers.map((roomNumber) => (
                                                <MenuItem key={roomNumber.id} value={roomNumber.roomNumber}>
                                                    {roomNumber.roomNumber}
                                                </MenuItem>))}
                                        </Field>
                                    </Stack>
                                </Stack>
                                <Typography sx={{textAlign: 'right', mt: 2}}>
                                    {
                                        props.isSubmitting ? <CircularProgress/> :
                                            <Button variant="outlined"
                                                    type="submit">{officerId ? t('updateOfficer') : t('createOfficer')}</Button>
                                    }
                                </Typography>
                            </Form>
                        )}
                    </Formik>
            }
        </>
    )
}

export default Officer;