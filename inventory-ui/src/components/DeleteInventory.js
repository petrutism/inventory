import {Button} from "@mui/material";
import {deleteInventory} from "./api/inventoryApi";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
const DeleteInventory = ({inventoryId}) => {

    const navigation = useNavigate();
    const {t} = useTranslation('deleteInventory');
    const onDeleteInventory = () => {
        deleteInventory(inventoryId)
            .then(() => {
                navigation('/');
            })
            .catch((err) => console.log(err));
    }

    return (
        <Button variant="outlined"
                type="button"
                color="error" onClick={() => onDeleteInventory()}>{t('deleteInventory')}</Button>
    );
}

export default DeleteInventory;