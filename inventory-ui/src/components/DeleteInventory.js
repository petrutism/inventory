import {Button} from "@mui/material";
import {deleteInventory} from "./api/inventoryApi";
import {useNavigate} from "react-router-dom";

const DeleteInventory = ({inventoryId}) => {

    const navigation = useNavigate();

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
                color="error" onClick={() => onDeleteInventory()}>DELETE INVENTORY</Button>
    );
}

export default DeleteInventory;