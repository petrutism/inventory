import {Button} from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {deleteInventory} from "./api/inventoryApi";
import {useNavigate} from "react-router-dom";

const DeleteProduct = ({inventoryId, removeInventory}) => {

    const navigation = useNavigate();

    const onDeleteInventory = () => {
        deleteInventory(inventoryId)
            .then(() => {
                if (removeInventory) {
                    removeInventory(inventoryId);
                }
                navigation('/');
            })
            .catch((err) => console.log(err));
    }

    return (
        <Button variant="outlined"
                type="button"
                color="error" onClick={() => onDeleteInventory()}><DeleteOutlinedIcon/></Button>
    );
}

export default DeleteProduct;