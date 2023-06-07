import {useEffect, useState} from "react";
import {getEmployees} from "../api/inventoryApi";
import {CircularProgress} from "@mui/material";

const Employees = () => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getEmployees()
            .then(({data}) => console.log('duomenys', data))
            .catch((error) => console.log('klaida', error))
            .finally(() => setLoading(false));
    });

    return (
        <>
            {
                loading ? <CircularProgress/> :
                    <div>Must show employees</div>
            }
        </>
    )
}
export default Employees;