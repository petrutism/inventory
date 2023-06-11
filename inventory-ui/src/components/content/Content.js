import {Container} from "@mui/material";
import Employee from "../forms/Employee";
import {Route, Routes} from "react-router-dom";
import Inventories from "../page/Inventories";
import Employees from "../page/Employees";
import Inventory from "../forms/Inventory";
import Rooms from "../page/Rooms";
import InventoryDetails from "../page/InventoryDetails";

const Content = () => {
    return (
        <>
            <Container disableGutters maxWidth="xl" component="main"
                       sx={{
                           display: 'flex',
                           flexDirection: 'column',
                           minHeight: 'calc(100vh - 240px)',
                           mt: 4,
                           mb: 4
                       }}>
                <Routes>
                    <Route path="/" element={<Inventories/>}/>
                    <Route path="/inventories/create" element={<Inventory key="create"/>}/>
                    <Route path="/inventories/id/:inventoryId/update" element={<Inventory key="update"/>}/>
                    <Route path="/inventories/id/:inventoryId" element={<InventoryDetails/>}/>

                    <Route path="/employees/create" element={<Employee/>}/>
                    <Route path="/employees" element={<Employees/>}/>
                    <Route path="/rooms" element={<Rooms/>}/>
                </Routes>
            </Container>
        </>
    );
}
export default Content;