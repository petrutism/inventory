import {useEffect, useState} from "react";
import {getRoomNumbers} from "../api/inventoryApi";
import {CircularProgress, Paper, Table, TableBody, TableContainer, TableHead, TableRow} from "@mui/material";
import {useParams} from "react-router-dom";
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import styled from "@emotion/styled";
import {NavLink} from "react-router-dom";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
const Rooms = () => {
    const {city} = useParams();
    const [loading, setLoading] = useState(true);
    const [roomNumbers, setRoomNumbers] = useState([]);

    useEffect(() => {
        getRoomNumbers(city)
            .then(({data}) => {
                setRoomNumbers(data);
                console.log('kabinetai pagal miesta duomenys', data)
            })
            .catch((error) => console.log('klaida', error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            {
                loading ? <CircularProgress/> :
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 700}} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>City</StyledTableCell>
                                    <StyledTableCell>Room number</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {roomNumbers.map((roomNumber) => (
                                    <StyledTableRow key={roomNumber.id}>
                                        <StyledTableCell>{city}</StyledTableCell>
                                        <StyledTableCell>{roomNumber.roomNumber}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
        </>
    )
}
export default Rooms;