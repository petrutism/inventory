import {NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getRoomById} from "../api/inventoryApi";
import {Button, CircularProgress, Grid, Paper, Typography} from "@mui/material";
import DeleteRoom from "../DeleteRoom";

const RoomDetailsPage = () => {
    const {roomId} = useParams();
    const [loading, setLoading] = useState(true);
    const [room, setRoom] = useState({});

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
                                            City:
                                        </Grid>
                                        <Grid item xs={10}>
                                            {room.city}
                                        </Grid>
                                        <Grid item xs={2}>
                                            Room number:
                                        </Grid>
                                        <Grid item xs={10}>
                                            {room.roomNumber}
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Button variant="outlined"
                                                    to={`/rooms/id/${room.id}/update`}
                                                    component={NavLink}>Update room</Button>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <DeleteRoom roomId={room.id}/>
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