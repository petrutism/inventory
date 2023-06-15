import {Button} from "@mui/material";
import {deleteEmployee} from "./api/inventoryApi";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
const DeleteEmployee = ({employeeId}) => {

    const navigation = useNavigate();
    const {t} = useTranslation('deleteEmployee');
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
                color="error" onClick={() => onDeleteEmployee()}>{t('deleteEmployee')}</Button>
    );
}

export default DeleteEmployee;