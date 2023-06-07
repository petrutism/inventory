import {useEffect, useState} from "react";
import {getInventories} from "../api/inventoryApi";
import {CircularProgress, Paper, Table, TableBody, TableContainer, TableHead, TableRow} from "@mui/material";
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import styled from "@emotion/styled";

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

const Inventories = () => {

    const [loading, setLoading] = useState(true);
    const [inventories, setInventories] = useState([]);

    useEffect(() => {
        getInventories()
            .then(({data}) => {
                setInventories(data);
                console.log('duomenys', data);
            })
            .catch((error) => console.log('klaida', error))
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
                                    <StyledTableCell>Inventory number</StyledTableCell>
                                    <StyledTableCell>Card number</StyledTableCell>
                                    <StyledTableCell>Description</StyledTableCell>
                                    <StyledTableCell>Category</StyledTableCell>
                                    <StyledTableCell>City</StyledTableCell>
                                    <StyledTableCell>Room number</StyledTableCell>
                                    <StyledTableCell>Officer</StyledTableCell>
                                    <StyledTableCell>Employee</StyledTableCell>
                                    <StyledTableCell align="right">Price at start of use</StyledTableCell>
                                    <StyledTableCell align="right">Price at end of use</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {inventories.map((inventory) => (
                                    <StyledTableRow key={inventory.id}>
                                        <StyledTableCell>{inventory.inventoryNumber}</StyledTableCell>
                                        <StyledTableCell>{inventory.cardNumber}</StyledTableCell>
                                        <StyledTableCell sx={{maxWidth: 300}}>{inventory.description}</StyledTableCell>
                                        <StyledTableCell>{inventory.category}</StyledTableCell>
                                        <StyledTableCell>{inventory.room.city}</StyledTableCell>
                                        <StyledTableCell>{inventory.room.roomNumber}</StyledTableCell>
                                        <StyledTableCell>{inventory.officer.name} {inventory.officer.surname}</StyledTableCell>
                                        <StyledTableCell>{inventory.employee.name} {inventory.employee.surname}</StyledTableCell>
                                        <StyledTableCell align="right">{inventory.priceBefore} €</StyledTableCell>
                                        <StyledTableCell align="right">{inventory.priceNow} €</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
        </>
    )
}
export default Inventories;