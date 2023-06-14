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

const employeeValidationSchema = Yup.object().shape(
    {
        name: Yup.string()
            .min(5, 'Name must be longer than 5')
            .max(20, 'Name must be shorter than 20')
            .required('Name is required'),
        surname: Yup.string()
            .min(5, 'Surname must be longer than 5')
            .max(20, 'Surname must be shorter than 20')
            .required('Surname is required')
    }
)
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
                setNotification({isVisible: true, message: 'Employee created successfully', severity: 'success'});
            })
            .catch((error) => {
                setNotification({isVisible: true, message: 'Employee cannot be created', severity: 'error'});
                console.log(error);
            })
            .finally(() => helper.setSubmitting(false));
    }
    const onEmployeeUpdate = (employeeFromForm, helper) => {
        updateEmployee(employeeFromForm, employeeId)
            .then(() => navigation(`/employees/id/${employeeId}`))
            .catch((error) => setNotification({
                isVisible: true,
                message: 'Employee cannot be updated',
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
                                        variant="h5">{employeeId ? 'Update Employee:' : 'Create Employee:'}</Typography>
                                    <FormTextInput error={props.touched.name && !!props.errors.name}
                                                   name="name"
                                                   label="Employee name"/>
                                    <FormTextInput error={props.touched.surname && !!props.errors.surname}
                                                   name="surname"
                                                   label="Employee surname"/>
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
                                                    type="submit">{employeeId ? 'Update employee' : 'Create employee'}</Button>
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