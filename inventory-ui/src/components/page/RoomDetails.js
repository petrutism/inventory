import {NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getRoomById} from "../api/inventoryApi";
import {Button, CircularProgress, Grid, Paper, Typography} from "@mui/material";
import DeleteRoom from "../DeleteRoom";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

const RoomDetailsPage = () => {
    const {roomId} = useParams();
    const [loading, setLoading] = useState(true);
    const [room, setRoom] = useState({});
    const user = useSelector(state => state.user.user);
    const {t} = useTranslation('roomDetails');

    useEffect(() => {
        getRoomById(roomId)
            .then(({data}) => setRoom(data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            {
                loading ? <CircularProgress/> :
                    <div>
                        <Paper elevation={3} sx={{p: 1}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h5">{room.city}, {room.roomNumber}</Typography>
                                    <Grid container spacing={2} sx={{mt: 2}}>
                                        <Grid item xs={2}>
                                            {t('city')}
                                        </Grid>
                                        <Grid item xs={10}>
                                            {room.city}
                                        </Grid>
                                        <Grid item xs={2}>
                                            {t('roomNumber')}
                                        </Grid>
                                        <Grid item xs={10}>
                                            {room.roomNumber}
                                        </Grid>
                                        <Grid item xs={3}>
                                            {user?.roles.includes('ADMIN') && <Button variant="outlined"
                                                                                      to={`/rooms/id/${room.id}/update`}
                                                                                      component={NavLink}>{t('updateRoom')}</Button>}
                                        </Grid>
                                        <Grid item xs={9}>
                                            {user?.roles.includes('ADMIN') && <DeleteRoom roomId={room.id}/>}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
            }
        </>
    );
};

export default RoomDetailsPage;