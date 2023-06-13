import {Button} from "@mui/material";
import {deleteOfficer} from "./api/inventoryApi";
import {useNavigate} from "react-router-dom";

const DeleteOfficer = ({officerId}) => {

    const navigation = useNavigate();

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
                color="error" onClick={() => onDeleteOfficer()}>DELETE OFFICER</Button>
    );
}

export default DeleteOfficer;