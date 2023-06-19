import {NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getOfficerById} from "../api/inventoryApi";
import {Button, CircularProgress, Grid, Paper, Typography} from "@mui/material";
import DeleteOfficer from "../DeleteOfficer";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

const OfficerDetailsPage = () => {
    const {officerId} = useParams();
    const [loading, setLoading] = useState(true);
    const user = useSelector(state => state.user.user);
    const [officer, setOfficer] = useState({});
    const {t} = useTranslation('officerDetails');

    useEffect(() => {
        getOfficerById(officerId)
            .then(({data}) => setOfficer(data))
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
                                    <Typography variant="h5">{officer.name} {officer.surname}</Typography>
                                    <Grid container spacing={2} sx={{mt: 2}}>
                                        <Grid item xs={2}>
                                            {t('city')}
                                        </Grid>
                                        <Grid item xs={10}>
                                            {officer.room.city}
                                        </Grid>
                                        <Grid item xs={2}>
                                            {t('roomNumber')}
                                        </Grid>
                                        <Grid item xs={10}>
                                            {officer.room.roomNumber}
                                        </Grid>
                                        <Grid item xs={3}>
                                            {user?.roles.includes('ADMIN') && <Button variant="outlined"
                                                                                      to={`/officers/id/${officer.id}/update`}
                                                                                      component={NavLink}>{t('updateOfficer')}</Button>}
                                        </Grid>
                                        <Grid item xs={9}>
                                            {user?.roles.includes('ADMIN') && <DeleteOfficer officerId={officer.id}/>}
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

export default OfficerDetailsPage;