import {Form, Formik} from "formik";
import {Alert, Button, CircularProgress, Stack, Typography} from "@mui/material";
import * as Yup from 'yup';
import FormTextInput from "./FormTextInput";
import * as React from "react";
import {useEffect, useState} from "react";
import {getRoomById, saveRoom, updateRoom} from "../api/inventoryApi";
import {useParams, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";


const Room = () => {
    const [notification, setNotification] = useState({isVisible: false});

    const navigation = useNavigate();
    const {roomId} = useParams();
    const [roomLoading, setRoomLoading] = useState(true);
    const [room, setRoom] = useState({
        city: '',
        roomNumber: '',
    });
    const {t} = useTranslation('room');
    const roomValidationSchema = Yup.object().shape(
        {
            city: Yup.string()
                .min(3, t('validationCityMin'))
                .max(20, t('validationCityMax'))
                .required(t('validationCityRequired')),
            roomNumber: Yup.number()
                .positive(t('validationRoomNumberPositive'))
                .required(t('validationRoomNumberRequired'))
        }
    )

    useEffect(() => {
        if (!roomId) {
            setRoomLoading(false);

            return;
        }

        getRoomById(roomId)
            .then(({data}) => setRoom(data))
            .catch((err) => console.log('room error', err))
            .finally(() => setRoomLoading(false));

    }, []);

    const onFormSubmit = (values, helper) => {

        const roomFromForm = {
            city: values.city,
            roomNumber: values.roomNumber
        };
        if (roomId) {
            onRoomUpdate(roomFromForm, helper);
            return;
        }

        onCreateRoom(roomFromForm, helper);
    }
    const onCreateRoom = (roomFromForm, helper) => {
        saveRoom(roomFromForm)
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
    const onRoomUpdate = (roomFromForm, helper) => {
        updateRoom(roomFromForm, roomId)
            .then(() => navigation(`/rooms/id/${roomId}`))
            .catch((error) => setNotification({
                isVisible: true,
                message: t('updateErrorMessage'),
                severity: 'error'
            }))
            .finally(() => helper.setSubmitting(false));
    }

    return (
        <>
            {
                roomLoading ? <CircularProgress/> :
                    <Formik
                        initialValues={room}
                        onSubmit={onFormSubmit}
                        validationSchema={roomValidationSchema}
                    >
                        {props => (
                            <Form>
                                <Stack spacing={1} direction="column">
                                    {notification.isVisible &&
                                        <Alert severity={notification.severity}>{notification.message}</Alert>}
                                    <Typography
                                        variant="h5">{roomId ? t('updateRoom') : t('createRoom')}</Typography>
                                    <FormTextInput error={props.touched.city && !!props.errors.city}
                                                   name="city"
                                                   label={t('labelCity')}/>
                                    <FormTextInput error={props.touched.roomNumber && !!props.errors.roomNumber}
                                                   name="roomNumber"
                                                   label={t('labelRoomNumber')}/>

                                </Stack>
                                <Typography sx={{textAlign: 'right', mt: 2}}>
                                    {
                                        props.isSubmitting ? <CircularProgress/> :
                                            <Button variant="outlined"
                                                    type="submit">{roomId ? t('updateRoom') : t('createRoom')}</Button>
                                    }
                                </Typography>
                            </Form>
                        )}
                    </Formik>
            }
        </>
    )
}

export default Room;