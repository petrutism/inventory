import {Button} from "@mui/material";
import {deleteRoom} from "./api/inventoryApi";
import {useNavigate} from "react-router-dom";

const DeleteRoom = ({roomId}) => {

    const navigation = useNavigate();

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
                color="error" onClick={() => onDeleteRoom()}>DELETE ROOM</Button>
    );
}

export default DeleteRoom;