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
import {useTranslation} from "react-i18next";

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
    const {t} = useTranslation('inventory');
    const inventoryValidationSchema = Yup.object().shape({
        inventoryNumber: Yup.string()
            .min(5, t('validationInventoryNumberMin'))
            .max(20, t('validationInventoryNumberMax'))
            .required(t('validationInventoryNumberRequired')),
        cardNumber: Yup.string()
            .min(5, t('validationCardNumberMin'))
            .max(20, t('validationCardNumberMax'))
            .required(t('validationCardNumberRequired')),
        description: Yup.string()
            .min(5, t('validationDescriptionMin'))
            .max(100, t('validationDescriptionMax'))
            .required(t('validationDescriptionRequired')),
        priceBefore: Yup.number()
            .typeError(t('validationPriceBeforeType'))
            .positive(t('validationPriceBeforePositive'))
            .required(t('validationPriceBeforeRequired')),
        priceNow: Yup.number()
            .typeError(t('validationPriceNowType'))
            .positive(t('validationPriceNowPositive'))
            .required(t('validationPriceNowRequired')),
        employeesName: Yup.string()
            .min(5, t('validationNameMin'))
            .max(20, t('validationNameMax'))
            .required(t('validationNameRequired')),
        employeesSurname: Yup.string()
            .min(5, t('validationSurnameMin'))
            .max(20, t('validationSurnameMax'))
            .required(t('validationSurnameRequired'))
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
                setNotification({isVisible: true, message: t('successMessage'), severity: 'success'});
            })
            .catch((error) => {
                setNotification({isVisible: true, message: t('errorMessage'), severity: 'error'});
                console.log(error);
            })
            .finally(() => helper.setSubmitting(false));
    }
    const onInventoryUpdate = (inventoryFromForm, helper) => {
        updateInventory(inventoryFromForm, inventoryId)
            .then(() => navigation(`/inventories/id/${inventoryId}`))
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
                                        variant="h5">{inventoryId ? t('updateInventory') : t('createInventory')}</Typography>
                                    <FormTextInput
                                        error={props.touched.inventoryNumber && !!props.errors.inventoryNumber}
                                        name="inventoryNumber"
                                        label={t('labelInventoryNumber')}/>
                                    <FormTextInput error={props.touched.cardNumber && !!props.errors.cardNumber}
                                                   name="cardNumber"
                                                   label={t('labelCardNumber')}/>
                                    <FormTextInput error={props.touched.description && !!props.errors.description}
                                                   name="description"
                                                   label={t('labelDescription')}/>
                                    <Field
                                        id="category"
                                        name="category"
                                        as={TextField}
                                        select
                                        label={t('labelCategory')}
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
                                            label={t('labelCity')}
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
                                            label={t('labelRoom')}
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
                                        label={t('labelOfficer')}
                                    >
                                        {officers.map((officer) => (<MenuItem key={officer.id} value={officer.id}>
                                            {officer.name} {officer.surname}
                                        </MenuItem>))}
                                    </Field>
                                    <Stack spacing={1} direction="row">
                                        <FormTextInput
                                            error={props.touched.employeesName && !!props.errors.employeesName}
                                            name="employeesName"
                                            label={t('labelEmployeesName')}/>
                                        <FormTextInput
                                            error={props.touched.employeesSurname && !!props.errors.employeesSurname}
                                            name="employeesSurname"
                                            label={t('labelEmployeesSurname')}/>
                                    </Stack>
                                    <Stack spacing={1} direction="row">
                                        <FormTextInput error={props.touched.priceBefore && !!props.errors.priceBefore}
                                                       name="priceBefore"
                                                       label={t('labelPriceBefore')}/>

                                        <FormTextInput error={props.touched.priceNow && !!props.errors.priceNow}
                                                       name="priceNow"
                                                       label={t('labelPriceNow')}/>
                                    </Stack>
                                </Stack>
                                <Typography sx={{textAlign: 'right', mt: 2}}>
                                    {props.isSubmitting ? <CircularProgress/> :
                                        <Button variant="outlined"
                                                type="submit">{inventoryId ? t('updateInventory') : t('createInventory')}</Button>}
                                </Typography>
                            </Form>)}
                    </Formik>
            }
        </>
    )
}

export default Inventory;