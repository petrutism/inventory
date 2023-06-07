import {useEffect, useState} from "react";
import {getEmployees, getRooms} from "../api/inventoryApi";
import {CircularProgress} from "@mui/material";

const Rooms = () => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRooms()
            .then(({data}) => console.log('duomenys', data))
            .catch((error) => console.log('klaida', error))
            .finally(() => setLoading(false));
    });

    return (
        <>
            {
                loading ? <CircularProgress/> :
                    <div>Must show rooms</div>
            }
        </>
    )
}
export default Rooms;