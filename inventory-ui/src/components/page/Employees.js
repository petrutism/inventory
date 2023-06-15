import {useEffect, useState} from "react";
import {getEmployees} from "../api/inventoryApi";
import {CircularProgress, Paper, Table, TableBody, TableContainer, TableHead, TableRow} from "@mui/material";
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import styled from "@emotion/styled";
import {NavLink} from "react-router-dom";
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

const Employees = () => {

    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState([]);
    const {t} = useTranslation('employees');

    useEffect(() => {
        getEmployees()
            .then(({data}) => {
                setEmployees(data);
                console.log('employees duomenys', data);
            })
            .catch((error) => console.log('employees klaida', error))
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
                                    <StyledTableCell>{t('fullName')}</StyledTableCell>
                                    <StyledTableCell>{t('city')}</StyledTableCell>
                                    <StyledTableCell>{t('roomNumber')}</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employees.map((employee) => (
                                    <StyledTableRow key={employee.id}>
                                        <StyledTableCell component="th" scope="row">
                                            <NavLink to={`/employees/id/${employee.id}`}>
                                                {employee.name} {employee.surname}
                                            </NavLink>
                                        </StyledTableCell>
                                        <StyledTableCell>{employee.room.city}</StyledTableCell>
                                        <StyledTableCell>{employee.room.roomNumber}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
        </>
    )
}
export default Employees;