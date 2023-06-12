import {NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getEmployeeById} from "../api/inventoryApi";
import {Button, CircularProgress, Grid, Paper, Typography} from "@mui/material";
import DeleteEmployee from "../DeleteEmployee";

const EmployeeDetailsPage = () => {
    const {employeeId} = useParams();
    const [loading, setLoading] = useState(true);
    const [employee, setEmployee] = useState({});

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
                                            City:
                                        </Grid>
                                        <Grid item xs={10}>
                                            {employee.room.city}
                                        </Grid>
                                        <Grid item xs={2}>
                                            Room number:
                                        </Grid>
                                        <Grid item xs={10}>
                                            {employee.room.roomNumber}
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Button variant="outlined"
                                                    to={`/employees/id/${employee.id}/update`}
                                                    component={NavLink}>Update employee</Button>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <DeleteEmployee employeeId={employee.id}/>
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