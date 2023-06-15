import {NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getInventoryById} from "../api/inventoryApi";
import {Button, CircularProgress, Grid, Paper, Typography} from "@mui/material";
import DeleteInventory from "../DeleteInventory";
import {useTranslation} from "react-i18next";
const InventoryDetailsPage = () => {
    const {inventoryId} = useParams();
    const [loading, setLoading] = useState(true);
    const [inventory, setInventory] = useState({});
    const {t} = useTranslation('inventoryDetails');

    useEffect(() => {
        getInventoryById(inventoryId)
            .then(({data}) => setInventory(data))
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
                                    <Typography variant="h5">{inventory.description}</Typography>
                                    <Grid container spacing={2} sx={{mt: 2}}>
                                        <Grid item xs={2}>
                                            {t('inventoryNumber')}
                                        </Grid>
                                        <Grid item xs={10}>
                                            {inventory.inventoryNumber}
                                        </Grid>
                                        <Grid item xs={2}>
                                            {t('cardNumber')}
                                        </Grid>
                                        <Grid item xs={10}>
                                            {inventory.cardNumber}
                                        </Grid>
                                        <Grid item xs={2}>
                                            {t('category')}
                                        </Grid>
                                        <Grid item xs={10}>
                                            {inventory.category}
                                        </Grid>
                                        <Grid item xs={2}>
                                            {t('city')}
                                        </Grid>
                                        <Grid item xs={10}>
                                            {inventory.room.city}
                                        </Grid>
                                        <Grid item xs={2}>
                                            {t('roomNumber')}
                                        </Grid>
                                        <Grid item xs={10}>
                                            {inventory.room.roomNumber}
                                        </Grid>
                                        <Grid item xs={2}>
                                            {t('officer')}
                                        </Grid>
                                        <Grid item xs={10}>
                                            {inventory.officer.name} {inventory.officer.surname}
                                        </Grid>
                                        <Grid item xs={2}>
                                            {t('employee')}
                                        </Grid>
                                        <Grid item xs={10}>
                                            {inventory.employee.name} {inventory.employee.surname}
                                        </Grid>
                                        <Grid item xs={2}>
                                            {t('priceAtStart')}
                                        </Grid>
                                        <Grid item xs={10}>
                                            {inventory.priceBefore}
                                        </Grid>
                                        <Grid item xs={2}>
                                            {t('priceAtEnd')}
                                        </Grid>
                                        <Grid item xs={10}>
                                            {inventory.priceNow}
                                        </Grid>

                                        <Grid item xs={3}>
                                            <Button variant="outlined"
                                                    to={`/inventories/id/${inventory.id}/update`}
                                                    component={NavLink}>{t('updateInventory')}</Button>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <DeleteInventory inventoryId={inventory.id}/>
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

export default InventoryDetailsPage;