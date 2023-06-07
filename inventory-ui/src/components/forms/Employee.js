import {Field, Form, Formik} from "formik";
import {Button, CircularProgress, Stack, Typography} from "@mui/material";
import * as Yup from 'yup';
import FormTextInput from "./FormTextInput";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";

const employeeValidationSchema = Yup.object().shape(
    {
        name: Yup.string()
            .min(5, 'Name must be longer than 5')
            .max(10, 'Name must be shorter than 10')
            .required('Name is required'),
        surname: Yup.string()
            .min(5, 'Surname must be longer than 5')
            .max(10, 'Surname must be shorter than 10')
            .required('Surname is required'),
        room: Yup.number()
            .typeError('Price must be a number')
            .positive('Price must be bigger then 0')
            .required('Price is required')
    }
)
const cities = [
    {
        value: 'Mažeikiai',
        label: 'Mažeikiai',
    },
    {
        value: 'Telšiai',
        label: 'Telšiai',
    },
    {
        value: 'Plungė',
        label: 'Plungė',
    },
    {
        value: 'Skuodas',
        label: 'Skuodas',
    },
    {
        value: 'Naujoji Akmenė',
        label: 'Naujoji Akmenė',
    },
    {
        value: 'Rietavas',
        label: 'Rietavas',
    },
];
const Employee = () => (

    <Formik
        initialValues={{
            name: '',
            surname: '',
            city:'',
            room: ''
        }}

        onSubmit={(values, helpers) => {
            console.log('values', values);
            console.log('helpers', helpers);

            setTimeout(() => {
                    helpers.setSubmitting(false);
                    helpers.resetForm();
                },
                1000);
        }}
        validationSchema={employeeValidationSchema}
    >
        {props => (
            <Form>
                <Stack spacing={1} direction="column">
                    <Typography variant="h5">Create employee:</Typography>
                    <FormTextInput error={props.touched.name && !!props.errors.name}
                                   name="name"
                                   label="Employee name"/>
                    <FormTextInput error={props.touched.surname && !!props.errors.surname}
                                   name="surname"
                                   label="Employee surname"/>
                    <Field
                        sx={{minWidth: '200px'}}
                        id="city"
                        name="city"
                        as={TextField}
                        select
                        label="Select city"
                    >
                        {cities.map((city) => (
                            <MenuItem key={city.value} value={city.value}>
                                {city.label}
                            </MenuItem>
                        ))}
                    </Field>
                    <FormTextInput error={props.touched.room && !!props.errors.room}
                                   name="room"
                                   label="Employee room"/>
                </Stack>
                <Typography sx={{textAlign: 'right', mt: 2}}>
                    {
                        props.isSubmitting ? <CircularProgress/> :
                            <Button variant="outlined" type="submit">Save employee</Button>
                    }
                </Typography>
            </Form>
        )}
    </Formik>
)

export default Employee;