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

const officerValidationSchema = Yup.object().shape(
    {
        name: Yup.string()
            .min(5, 'Name must be longer than 5')
            .max(10, 'Name must be shorter than 10')
            .required('Name is required'),
        surname: Yup.string()
            .min(5, 'Surname must be longer than 5')
            .max(10, 'Surname must be shorter than 10')
            .required('Surname is required')
    }
)
const Officer = () => {
    const [notification, setNotification] = useState({isVisible: false});
    const [citiesLoading, setCitiesLoading] = useState(true);
    const [roomsLoading, setRoomsLoading] = useState(true);
    const [rooms, setRooms] = useState([]);
    const [roomNumbersLoading, setRoomNumbersLoading] = useState(true);

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
            city:'',
            roomNumber:'',
        },
    });

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

        rooms.forEach(r => {
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
                setNotification({isVisible: true, message: 'Officer created successfully', severity: 'success'});
            })
            .catch((error) => {
                setNotification({isVisible: true, message: 'Officer cannot be created', severity: 'error'});
                console.log(error);
            })
            .finally(() => helper.setSubmitting(false));
    }
    const onOfficerUpdate = (officerFromForm, helper) => {
        updateOfficer(officerFromForm, officerId)
            .then(() => navigation(`/officers/id/${officerId}`))
            .catch((error) => setNotification({
                isVisible: true,
                message: 'Officer cannot be updated',
                severity: 'error'
            }))
            .finally(() => helper.setSubmitting(false));
    }
    const handleCityChange = (event) => {
        const roomNumbersFromBackend = [];
        setSelectedCity(event.target.value);

        getRoomNumbers(event.target.value)
            .then(({data}) => {
                data.map((rm) => {
                    roomNumbersFromBackend.push({
                        value: `${rm}`,
                        label: `${rm}`,
                    })
                });
                setRoomNumbers(roomNumbersFromBackend);
            })
            .finally(() => {
                setRoomNumbersLoading(false);
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

    useEffect(() => {
        getRooms()
            .then(({data}) => {
                setRooms(data);
            })
            .catch((error) => console.log('rooms error', error))
            .finally(() => {
                setRoomsLoading(false);
                console.log('rooms', rooms);
            });
    }, []);

    return (
        <>
            {
                citiesLoading || roomsLoading ? <CircularProgress/> :
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
                                        variant="h5">{officerId ? 'Update Officer:' : 'Create Officer:'}</Typography>
                                    <FormTextInput error={props.touched.name && !!props.errors.name}
                                                   name="name"
                                                   label="Officers name"/>
                                    <FormTextInput error={props.touched.surname && !!props.errors.surname}
                                                   name="surname"
                                                   label="Officers surname"/>
                                    <Stack spacing={1} direction="row">
                                        <Field
                                            sx={{minWidth: '200px'}}
                                            id="city"
                                            name="city"
                                            value={selectedCity}
                                            as={TextField}
                                            select
                                            label="Select city"
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
                                            label="Select room"
                                        >
                                            {roomNumbers.map((roomNumber) => (
                                                <MenuItem key={roomNumber?.value} value={roomNumber?.value}>
                                                    {roomNumber?.value}
                                                </MenuItem>))}
                                        </Field>
                                    </Stack>
                                </Stack>
                                <Typography sx={{textAlign: 'right', mt: 2}}>
                                    {
                                        props.isSubmitting ? <CircularProgress/> :
                                            <Button variant="outlined"
                                                    type="submit">{officerId ? 'Update officer' : 'Create officer'}</Button>
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