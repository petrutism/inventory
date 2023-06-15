import {Button} from "@mui/material";
import {deleteRoom} from "./api/inventoryApi";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
const DeleteRoom = ({roomId}) => {

    const navigation = useNavigate();
    const {t} = useTranslation('deleteRoom');
    const onDeleteRoom = () => {
        deleteRoom(roomId)
            .then(() => {
                navigation('/');
            })
            .catch((err) => console.log(err));
    }

    return (
        <Button variant="outlined"
                type="button"
                color="error" onClick={() => onDeleteRoom()}>{t('deleteRoom')}</Button>
    );
}

export default DeleteRoom;