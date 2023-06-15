import {useEffect, useState} from "react";
import {getRoomNumbers} from "../api/inventoryApi";
import {CircularProgress, Paper, Table, TableBody, TableContainer, TableHead, TableRow} from "@mui/material";
import {NavLink, useParams} from "react-router-dom";
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import styled from "@emotion/styled";
import {useTranslation} from "react-i18next";

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
    const [rooms, setRooms] = useState([]);
    const {t} = useTranslation('rooms');

    useEffect(() => {
        getRoomNumbers(city)
            .then(({data}) => {
                setRooms(data);
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
                                    <StyledTableCell>{t('city')}</StyledTableCell>
                                    <StyledTableCell>{t('roomNumber')}</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rooms.map((room) => (
                                    <StyledTableRow key={room.id}>
                                        <StyledTableCell>{city}</StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            <NavLink to={`/rooms/id/${room.id}`}>
                                                {room.roomNumber}
                                            </NavLink>
                                        </StyledTableCell>
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