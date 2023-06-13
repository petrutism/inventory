import {useEffect, useState} from "react";
import {getOfficers} from "../api/inventoryApi";
import {CircularProgress, Paper, Table, TableBody, TableContainer, TableHead, TableRow} from "@mui/material";
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

const Officers = () => {

    const [loading, setLoading] = useState(true);
    const [officers, setOfficers] = useState([]);

    useEffect(() => {
        getOfficers()
            .then(({data}) => {
                setOfficers(data);
                console.log('officers duomenys', data);
            })
            .catch((error) => console.log('officers klaida', error))
            .finally(() => setLoading(false))
    }, []);

    return (
        <>
            {
                loading ? <CircularProgress/> :
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 700}} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Officer full name</StyledTableCell>
                                    <StyledTableCell>City</StyledTableCell>
                                    <StyledTableCell>Room number</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {officers.map((officer) => (
                                    <StyledTableRow key={officer.id}>
                                        <StyledTableCell component="th" scope="row">
                                            <NavLink to={`/officers/id/${officer.id}`}>
                                                {officer.name} {officer.surname}
                                            </NavLink>
                                        </StyledTableCell>
                                        <StyledTableCell>{officer.room.city}</StyledTableCell>
                                        <StyledTableCell>{officer.room.roomNumber}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
        </>
    )
}
export default Officers;