import {Button} from "@mui/material";
import {deleteEmployee} from "./api/inventoryApi";
import {useNavigate} from "react-router-dom";

const DeleteEmployee = ({employeeId}) => {

    const navigation = useNavigate();

    const onDeleteEmployee = () => {
        deleteEmployee(employeeId)
            .then(() => {
                navigation('/');
            })
            .catch((err) => console.log(err));
    }

    return (
        <Button variant="outlined"
                type="button"
                color="error" onClick={() => onDeleteEmployee()}>DELETE EMPLOYEE</Button>
    );
}

export default DeleteEmployee;