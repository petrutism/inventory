import {useEffect, useState} from "react";
import {getCities} from "../api/inventoryApi";
import {
    CircularProgress, Grid, Paper
} from "@mui/material";
import Rooms from "./Rooms";
import {NavLink} from "react-router-dom";

const Cities = () => {

    const [loading, setLoading] = useState(true);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        getCities()
            .then(({data}) => {
                setCities(data);
                console.log('cities duomenys', data);
            })
            .catch((error) => console.log('cities klaida', error))
            .finally(() => setLoading(false))
    }, []);

    return (
        <>
            {
                loading ? <CircularProgress/> :

                    <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                        {cities.map((city) => (
                            <Grid item xs={4}>
                                <Paper elevation={3} sx={{p: 1}}>
                                    <NavLink key={city} to={`/rooms/${city}`}>
                                        {city}
                                    </NavLink>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>

            }
        </>
    )
}
export default Cities;