import {Button} from "@mui/material";
import {deleteOfficer} from "./api/inventoryApi";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const DeleteOfficer = ({officerId}) => {

    const navigation = useNavigate();
    const {t} = useTranslation('deleteOfficer');
    const onDeleteOfficer = () => {
        deleteOfficer(officerId)
            .then(() => {
                navigation('/');
            })
            .catch((err) => console.log(err));
    }

    return (
        <Button variant="outlined"
                type="button"
                color="error" onClick={() => onDeleteOfficer()}>{t('deleteOfficer')}</Button>
    );
}

export default DeleteOfficer;