import {Container} from "@mui/material";
import Employee from "../forms/Employee";
import Officer from "../forms/Officer";

import {Route, Routes} from "react-router-dom";
import Inventories from "../page/Inventories";
import Employees from "../page/Employees";
import Officers from "../page/Officers";

import Inventory from "../forms/Inventory";
import Rooms from "../page/Rooms";
import InventoryDetails from "../page/InventoryDetails";
import EmployeeDetails from "../page/EmployeeDetails";
import OfficerDetails from "../page/OfficerDetails";

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
                </Routes>
            </Container>
        </>
    );
}
export default Content;