import {NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getEmployeeById} from "../api/inventoryApi";
import {Button, CircularProgress, Grid, Paper, Typography} from "@mui/material";
import DeleteEmployee from "../DeleteEmployee";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
const EmployeeDetailsPage = () => {
    const {employeeId} = useParams();
    const [loading, setLoading] = useState(true);
    const [employee, setEmployee] = useState({});
    const user = useSelector(state => state.user.user);
    const {t} = useTranslation('employeeDetails');

    useEffect(() => {
        getEmployeeById(employeeId)
            .then(({data}) => setEmployee(data))
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
                                    <Typography variant="h5">{employee.name} {employee.surname}</Typography>
                                    <Grid container spacing={2} sx={{mt: 2}}>
                                        <Grid item xs={2}>
                                            {t('city')}
                                        </Grid>
                                        <Grid item xs={10}>
                                            {employee.room.city}
                                        </Grid>
                                        <Grid item xs={2}>
                                            {t('roomNumber')}
                                        </Grid>
                                        <Grid item xs={10}>
                                            {employee.room.roomNumber}
                                        </Grid>
                                        <Grid item xs={3}>
                                            {user?.roles.includes('ADMIN') && <Button variant="outlined"
                                                    to={`/employees/id/${employee.id}/update`}
                                                    component={NavLink}>{t('updateEmployee')}</Button>}
                                        </Grid>
                                        <Grid item xs={9}>
                                            {user?.roles.includes('ADMIN') && <DeleteEmployee employeeId={employee.id}/>}
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

export default EmployeeDetailsPage;