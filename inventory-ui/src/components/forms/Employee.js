import {Field, Form, Formik} from "formik";
import {Alert, Button, CircularProgress, Stack, Typography} from "@mui/material";
import * as Yup from 'yup';
import FormTextInput from "./FormTextInput";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import {useEffect, useState} from "react";
import {getCities, getEmployeeById, getRoomNumbers, getRooms, saveEmployee, updateEmployee} from "../api/inventoryApi";
import {useParams, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";


const Employee = () => {
    const [notification, setNotification] = useState({isVisible: false});
    const [citiesLoading, setCitiesLoading] = useState(true);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [roomNumbers, setRoomNumbers] = useState([]);
    const navigation = useNavigate();
    const {employeeId} = useParams();
    const [employee, setEmployee] = useState({
        name: '',
        surname: '',
        room: {
            city: '',
            roomNumber: '',
        },
    });
    const {t} = useTranslation('employee');
    const employeeValidationSchema = Yup.object().shape(
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
    )

    useEffect(() => {
        if (!employeeId) {

            return;
        }

        getEmployeeById(employeeId)
            .then(({data}) => setEmployee(data))
            .catch((err) => console.log('employee error', err))
            .finally();

    }, []);

    const onFormSubmit = (values, helper) => {
        values.city = selectedCity;

        roomNumbers.forEach(r => {
            if (r.city === selectedCity && r.roomNumber === values.selectedRoom) {
                values.room = r;
            }
        });

        console.log('employee values', values);
        console.log('employee helpers', helper);

        const employeeFromForm = {
            name: values.name,
            surname: values.surname,
            room: values.room
        };
        if (employeeId) {
            onEmployeeUpdate(employeeFromForm, helper);
            return;
        }

        onCreateEmployee(employeeFromForm, helper);
    }
    const onCreateEmployee = (employeeFromForm, helper) => {
        saveEmployee(employeeFromForm)
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
    const onEmployeeUpdate = (employeeFromForm, helper) => {
        updateEmployee(employeeFromForm, employeeId)
            .then(() => navigation(`/employees/id/${employeeId}`))
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
                            name: employee.name,
                            surname: employee.surname,
                            city: employee.room.city,
                            room: employee.room.roomNumber,
                            selectedRoom: ''
                        }}

                        onSubmit={onFormSubmit}
                        validationSchema={employeeValidationSchema}
                    >
                        {props => (
                            <Form>
                                <Stack spacing={1} direction="column">
                                    {notification.isVisible &&
                                        <Alert severity={notification.severity}>{notification.message}</Alert>}
                                    <Typography
                                        variant="h5">{employeeId ? t('updateEmployee') : t('createEmployee')}</Typography>
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
                                                    type="submit">{employeeId ? t('updateEmployee') : t('createEmployee')}</Button>
                                    }
                                </Typography>
                            </Form>
                        )}
                    </Formik>
            }
        </>
    )
}

export default Employee;