import {Field, Form, Formik} from "formik";
import {Alert, Button, CircularProgress, Stack, Typography} from "@mui/material";
import * as Yup from 'yup';
import FormTextInput from "./FormTextInput";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import * as React from "react";
import {useEffect, useState} from "react";
import {
    getCities,
    getEmployees,
    getOfficers,
    getRoomNumbers,
    getRooms,
    getInventoryById,
    saveInventory,
    updateInventory
} from "../api/inventoryApi";
import {useNavigate, useParams} from "react-router-dom";

const inventoryValidationSchema = Yup.object().shape({
    inventoryNumber: Yup.string()
        .min(5, 'Inventory number must be longer than 5')
        .max(20, 'Inventory number must be shorter than 20')
        .required('Inventory number is required'),
    cardNumber: Yup.string()
        .min(5, 'Card number must be longer than 5')
        .max(20, 'Card number must be shorter than 20')
        .required('Card number is required'),
    description: Yup.string()
        .min(5, 'Description must be longer than 5')
        .max(100, 'Description must be shorter than 100')
        .required('Description is required'),
    priceBefore: Yup.number()
        .typeError('Price must be a number')
        .positive('Price must be bigger than 0')
        .required('Price is required'),
    priceNow: Yup.number()
        .typeError('Price must be a number')
        .positive('Price must be bigger than 0')
        .required('Price is required'),
    employeesName: Yup.string()
        .min(5, 'Employees name must be longer than 2')
        .max(10, 'Employees surname must be shorter than 10')
        .required('Employees name is required'),
    employeesSurname: Yup.string()
        .min(5, 'Employees surname must be longer than 2')
        .max(10, 'Employees surname must be shorter than 20')
        .required('Employees surname is required')
});

const Inventory = () => {
    const [notification, setNotification] = useState({isVisible: false});
    const categories = [
        {
            value: 'PC', label: 'PC',
        },
        {
            value: 'Phone', label: 'Phone',
        },
        {
            value: 'Furniture', label: 'Furniture',
        },
        {
            value: 'Car', label: 'Car',
        },
        {
            value: 'Building', label: 'Building',
        },
        {
            value: 'Other', label: 'Other',
        },
    ];

    const [officersLoading, setOfficersLoading] = useState(true);
    const [citiesLoading, setCitiesLoading] = useState(true);
    const [officers, setOfficers] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [roomNumbers, setRoomNumbers] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [inventoryLoading, setInventoryLoading] = useState(true);
    const navigation = useNavigate();
    const {inventoryId} = useParams();
    const [inventory, setInventory] = useState({
        inventoryNumber: '',
        cardNumber: '',
        description: '',
        category: '',
        room: {
            city: '',
            roomNumber: ''
        },
        officer: {
            id: '',
            name: '',
            surname: ''
        },
        employee: {},
        priceBefore: '',
        priceNow: ''
    });

    useEffect(() => {
        if (!inventoryId) {
            setInventoryLoading(false);

            return;
        }

        getInventoryById(inventoryId)
            .then(({data}) => {
                    setInventory(data);
                    console.log('inventory data test', data);
                }
            )

            .catch((err) => console.log(err))
            .finally(() => setInventoryLoading(false));

    }, []);

    const onFormSubmit = (values, helper) => {
        values.city = selectedCity;

        roomNumbers.forEach(r => {
            if (r.city === selectedCity && r.roomNumber === values.selectedRoom) {
                values.room = r;
            }
        });
        employees.forEach(e => {
            if (e.name === values.employeesName && e.surname === values.employeesSurname) {
                values.employee = e;
            }
        });
        officers.forEach(o => {
            if (o.id === values.officerId) {
                values.officer = o;
            }
        });

        console.log('values', values);
        console.log('helpers', helper);

        const inventoryFromForm = {
            inventoryNumber: values.inventoryNumber,
            cardNumber: values.cardNumber,
            description: values.description,
            category: values.category,
            room: values.room,
            officer: values.officer,
            employee: values.employee,
            priceBefore: values.priceBefore,
            priceNow: values.priceNow
        };
        if (inventoryId) {
            onInventoryUpdate(inventoryFromForm, helper);
            return;
        }

        onCreateInventory(inventoryFromForm, helper);
    }
    const onCreateInventory = (inventoryFromForm, helper) => {
        saveInventory(inventoryFromForm)
            .then((response) => {
                helper.resetForm();
                setNotification({isVisible: true, message: 'Inventory created successfully', severity: 'success'});
            })
            .catch((error) => {
                setNotification({isVisible: true, message: 'Inventory cannot be created', severity: 'error'});
                console.log(error);
            })
            .finally(() => helper.setSubmitting(false));
    }
    const onInventoryUpdate = (inventoryFromForm, helper) => {
        updateInventory(inventoryFromForm, inventoryId)
            .then(() => navigation(`/inventories/id/${inventoryId}`))
            .catch((error) => setNotification({
                isVisible: true,
                message: 'Inventory cannot be updated',
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
        getOfficers()
            .then(({data}) => {
                setOfficers(data);
            })
            .catch((error) => console.log('officers error', error))
            .finally(() => {
                setOfficersLoading(false);
                console.log('officers', officers);
            });
    }, []);

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
                console.log('cities', cities);
            });
    }, []);

    useEffect(() => {
        getEmployees()
            .then(({data}) => {
                setEmployees(data);
            })
            .catch((error) => console.log('employees error', error))
            .finally(() => {

                console.log('employees', employees);
            });
    }, []);

    return (
        <>
            {
                officersLoading || citiesLoading || inventoryLoading ? <CircularProgress/> :
                    <Formik
                        initialValues={{
                            inventoryNumber: inventory.inventoryNumber,
                            cardNumber: inventory.cardNumber,
                            description: inventory.description,
                            category: inventory.category,
                            city: inventory.room.city,
                            room: inventory.room,
                            employeesName: inventory.employee.name,
                            employeesSurname: inventory.employee.surname,
                            employee: inventory.employee,
                            priceBefore: inventory.priceBefore,
                            priceNow: inventory.priceNow,
                            selectedRoom: inventory.room.roomNumber,
                            selectedCity: inventory.room.city,
                            officerId: inventory.officer.id
                        }}

                        onSubmit={onFormSubmit}

                        validationSchema={inventoryValidationSchema}
                    >
                        {props => (
                            <Form>
                                <Stack spacing={1} direction="column">
                                    {notification.isVisible &&
                                        <Alert severity={notification.severity}>{notification.message}</Alert>}
                                    <Typography
                                        variant="h5">{inventoryId ? 'Update Inventory:' : 'Create Inventory:'}</Typography>
                                    <FormTextInput
                                        error={props.touched.inventoryNumber && !!props.errors.inventoryNumber}
                                        name="inventoryNumber"
                                        label="Inventory Number"/>
                                    <FormTextInput error={props.touched.cardNumber && !!props.errors.cardNumber}
                                                   name="cardNumber"
                                                   label="Inventory card number"/>
                                    <FormTextInput error={props.touched.description && !!props.errors.description}
                                                   name="description"
                                                   label="Inventory description"/>
                                    <Field
                                        id="category"
                                        name="category"
                                        as={TextField}
                                        select
                                        label="Select category"
                                    >
                                        {categories.map((category) => (
                                            <MenuItem key={category.value} value={category.value}>
                                                {category.label}
                                            </MenuItem>))}
                                    </Field>
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
                                    <Field
                                        id="officerId"
                                        name="officerId"
                                        as={TextField}
                                        select
                                        label="Select officer"
                                    >
                                        {officers.map((officer) => (<MenuItem key={officer.id} value={officer.id}>
                                            {officer.name} {officer.surname}
                                        </MenuItem>))}
                                    </Field>
                                    <Stack spacing={1} direction="row">
                                        <FormTextInput
                                            error={props.touched.employeesName && !!props.errors.employeesName}
                                            name="employeesName"
                                            label="Employees name"/>
                                        <FormTextInput
                                            error={props.touched.employeesSurname && !!props.errors.employeesSurname}
                                            name="employeesSurname"
                                            label="Employees surname"/>
                                    </Stack>
                                    <Stack spacing={1} direction="row">
                                        <FormTextInput error={props.touched.priceBefore && !!props.errors.priceBefore}
                                                       name="priceBefore"
                                                       label="Inventory price before using"/>

                                        <FormTextInput error={props.touched.priceNow && !!props.errors.priceNow}
                                                       name="priceNow"
                                                       label="Inventory price at the end of use"/>
                                    </Stack>
                                </Stack>
                                <Typography sx={{textAlign: 'right', mt: 2}}>
                                    {props.isSubmitting ? <CircularProgress/> :
                                        <Button variant="outlined"
                                                type="submit">{inventoryId ? 'Update inventory' : 'Create inventory'}</Button>}
                                </Typography>
                            </Form>)}
                    </Formik>
            }
        </>
    )
}

export default Inventory;