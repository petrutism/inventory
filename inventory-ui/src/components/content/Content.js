import {Container} from "@mui/material";
import Employee from "../forms/Employee";
import Officer from "../forms/Officer";

import {Route, Routes} from "react-router-dom";
import Inventories from "../page/Inventories";
import Employees from "../page/Employees";
import Officers from "../page/Officers";
import Cities from "../page/Cities";

import Inventory from "../forms/Inventory";
import Rooms from "../page/Rooms";
import Room from "../forms/Room";
import InventoryDetails from "../page/InventoryDetails";
import EmployeeDetails from "../page/EmployeeDetails";
import OfficerDetails from "../page/OfficerDetails";
import RoomDetails from "../page/RoomDetails";
import Login from "../forms/Login";

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

                    <Route path="/employees" element={<Employees/>}/>
                    <Route path="/employees/create" element={<Employee key="create"/>}/>
                    <Route path="/employees/id/:employeeId/update" element={<Employee key="update"/>}/>
                    <Route path="/employees/id/:employeeId" element={<EmployeeDetails/>}/>

                    <Route path="/officers" element={<Officers/>}/>
                    <Route path="/officers/create" element={<Officer key="create"/>}/>
                    <Route path="/officers/id/:officerId/update" element={<Officer key="update"/>}/>
                    <Route path="/officers/id/:officerId" element={<OfficerDetails/>}/>

                    <Route path="/rooms" element={<Rooms/>}/>
                    <Route path="/cities" element={<Cities/>}/>
                    <Route path="/rooms/:city" element={<Rooms/>}/>
                    <Route path="/rooms/create" element={<Room key="create"/>}/>
                    <Route path="/rooms/id/:roomId/update" element={<Room key="update"/>}/>
                    <Route path="/rooms/id/:roomId" element={<RoomDetails/>}/>

                    <Route path="/login" element={<Login/>}/>

                </Routes>
            </Container>
        </>
    );
}
export default Content;