import {Field, Form, Formik} from "formik";
import {Button, CircularProgress, List, Stack, Typography} from "@mui/material";
import * as Yup from 'yup';
import FormTextInput from "./FormTextInput";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import * as React from "react";
import {useEffect, useState} from "react";
import {getCities, getOfficers, getRoomNumbers} from "../api/inventoryApi";

const inventoryValidationSchema = Yup.object().shape({
    inventoryNumber: Yup.string()
        .min(5, 'Inventory number must be longer than 5')
        .max(20, 'Inventory number must be shorter than 20')
        .required('Inventory number is required'), cardNumber: Yup.string()
        .min(5, 'Card number must be longer than 5')
        .max(20, 'Card number must be shorter than 20')
        .required('Card number is required'), description: Yup.string()
        .min(5, 'Description must be longer than 5')
        .max(100, 'Description must be shorter than 100')
        .required('Description is required'), room: Yup.number()
        .typeError('Room number must be a number')
        .positive('Room number must be bigger than 0')
        .required('Room number is required'), priceBefore: Yup.number()
        .typeError('Price must be a number')
        .positive('Price must be bigger than 0')
        .required('Price is required'), priceNow: Yup.number()
        .typeError('Price must be a number')
        .positive('Price must be bigger than 0')
        .required('Price is required'), employeesName: Yup.string()
        .min(5, 'Employees name must be longer than 2')
        .max(10, 'Employees surname must be shorter than 10')
        .required('Employees name is required'), employeesSurname: Yup.string()
        .min(5, 'Employees surname must be longer than 2')
        .max(10, 'Employees surname must be shorter than 20')
        .required('Employees surname is required')
});

const Inventory = () => {
    const categories = [{
        value: 'PC', label: 'PC',
    }, {
        value: 'Phone', label: 'Phone',
    }, {
        value: 'Furniture', label: 'Furniture',
    }, {
        value: 'Cars', label: 'Cars',
    },];
    const [officersLoading, setOfficersLoading] = useState(true);
    const [citiesLoading, setCitiesLoading] = useState(true);
    const [roomNumbersLoading, setRoomNumbersLoading] = useState(true);

    const [officers, setOfficers] = useState([]);
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState('');
    const [roomNumbers, setRoomNumbers] = useState([]);
    const handleCityChange = (event) => {
        const roomNumbersFromBackend = [];
        setCity(event.target.value);
        getRoomNumbers(event.target.value)
            .then(({data}) => {
                data.map((r) => {
                    roomNumbersFromBackend.push({
                        value: `${r}`,
                        label: `${r}`,
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


    return (
        <>
            {
                officersLoading && citiesLoading && roomNumbersLoading ? <CircularProgress/> :
                    <Formik
                        initialValues={{
                            inventoryNumber: '',
                            cardNumber: '',
                            description: '',
                            category: '',
                            city: '',
                            room: '',
                            officer: '',
                            employeesName: '',
                            employeesSurname: '',
                            priceBefore: '',
                            priceNow: ''
                        }}

                        onSubmit={(values, helpers) => {
                            console.log('values', values);
                            console.log('helpers', helpers);

                            setTimeout(() => {
                                helpers.setSubmitting(false);
                                helpers.resetForm();
                            }, 1000);
                        }}
                        validationSchema={inventoryValidationSchema}
                    >
                        {props => (<Form>
                            <Stack spacing={1} direction="column">
                                <Typography variant="h5">Create inventory:</Typography>
                                <FormTextInput error={props.touched.inventoryNumber && !!props.errors.inventoryNumber}
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
                                        value={city}
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
                                        id="room"
                                        name="room"
                                        as={TextField}
                                        select
                                        label="Select room"
                                    >
                                        {roomNumbers.map((roomNumber) => (
                                            <MenuItem key={roomNumber.value} value={roomNumber.value}>
                                                {roomNumber.label}
                                            </MenuItem>))}
                                    </Field>
                                </Stack>
                                <Field
                                    id="officer"
                                    name="officer"
                                    as={TextField}
                                    select
                                    label="Select officer"
                                >
                                    {officers.map((officer) => (<MenuItem key={officer.id} value={officer}>
                                        {officer.name} {officer.surname}
                                    </MenuItem>))}
                                </Field>
                                <Stack spacing={1} direction="row">
                                    <FormTextInput error={props.touched.employeesName && !!props.errors.employeesName}
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
                                    <Button variant="outlined" type="submit">Save inventory</Button>}
                            </Typography>
                        </Form>)}
                    </Formik>
            }
        </>
    )
}

export default Inventory;