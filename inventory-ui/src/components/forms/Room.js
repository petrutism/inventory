import {Form, Formik} from "formik";
import {Alert, Button, CircularProgress, Stack, Typography} from "@mui/material";
import * as Yup from 'yup';
import FormTextInput from "./FormTextInput";
import * as React from "react";
import {useEffect, useState} from "react";
import {getRoomById, saveRoom, updateRoom} from "../api/inventoryApi";
import {useParams, useNavigate} from "react-router-dom";

const roomValidationSchema = Yup.object().shape(
    {
        city: Yup.string()
            .min(3, 'City name must be longer than 3')
            .max(20, 'City name must be shorter than 20')
            .required('City is required'),
        roomNumber: Yup.number()
            .positive('Room number must be positive value')
            .required('Room number is required')
    }
)
const Room = () => {
    const [notification, setNotification] = useState({isVisible: false});

    const navigation = useNavigate();
    const {roomId} = useParams();
    const [roomLoading, setRoomLoading] = useState(true);
    const [room, setRoom] = useState({
        city: '',
        roomNumber: '',
    });

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
                setNotification({isVisible: true, message: 'Room created successfully', severity: 'success'});
            })
            .catch((error) => {
                setNotification({isVisible: true, message: 'Room cannot be created', severity: 'error'});
                console.log(error);
            })
            .finally(() => helper.setSubmitting(false));
    }
    const onRoomUpdate = (roomFromForm, helper) => {
        updateRoom(roomFromForm, roomId)
            .then(() => navigation(`/rooms/id/${roomId}`))
            .catch((error) => setNotification({
                isVisible: true,
                message: 'Room cannot be updated',
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
                                        variant="h5">{roomId ? 'Update Room:' : 'Create Room:'}</Typography>
                                    <FormTextInput error={props.touched.city && !!props.errors.city}
                                                   name="city"
                                                   label="City"/>
                                    <FormTextInput error={props.touched.roomNumber && !!props.errors.roomNumber}
                                                   name="roomNumber"
                                                   label="Room number"/>

                                </Stack>
                                <Typography sx={{textAlign: 'right', mt: 2}}>
                                    {
                                        props.isSubmitting ? <CircularProgress/> :
                                            <Button variant="outlined"
                                                    type="submit">{roomId ? 'Update room' : 'Create room'}</Button>
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