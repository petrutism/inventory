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
import SecuredRoute from "../security/SecuredRoute";

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
                    <Route path="/" element={<SecuredRoute roles={['USER']}/>}>
                        <Route path="/" element={<Inventories/>}/>
                    </Route>
                    <Route path="/inventories/create" element={<SecuredRoute roles={['ADMIN']}/>}>
                        <Route path="/inventories/create" element={<Inventory key="create"/>}/>
                    </Route>
                    <Route path="/inventories/id/:inventoryId/update" element={<SecuredRoute roles={['ADMIN']}/>}>
                        <Route path="/inventories/id/:inventoryId/update" element={<Inventory key="update"/>}/>
                    </Route>
                    <Route path="/inventories/id/:inventoryId" element={<SecuredRoute roles={['USER']}/>}>
                        <Route path="/inventories/id/:inventoryId" element={<InventoryDetails/>}/>
                    </Route>
                    <Route path="/employees" element={<SecuredRoute roles={['USER']}/>}>
                        <Route path="/employees" element={<Employees/>}/>
                    </Route>
                    <Route path="/employees/create" element={<SecuredRoute roles={['ADMIN']}/>}>
                        <Route path="/employees/create" element={<Employee key="create"/>}/>
                    </Route>
                    <Route path="/employees/id/:employeeId/update" element={<SecuredRoute roles={['ADMIN']}/>}>
                        <Route path="/employees/id/:employeeId/update" element={<Employee key="update"/>}/>
                    </Route>
                    <Route path="/employees/id/:employeeId" element={<SecuredRoute roles={['USER']}/>}>
                        <Route path="/employees/id/:employeeId" element={<EmployeeDetails/>}/>
                    </Route>
                    <Route path="/officers" element={<SecuredRoute roles={['USER']}/>}>
                        <Route path="/officers" element={<Officers/>}/>
                    </Route>
                    <Route path="/officers/create" element={<SecuredRoute roles={['ADMIN']}/>}>
                        <Route path="/officers/create" element={<Officer key="create"/>}/>
                    </Route>
                    <Route path="/officers/id/:officerId/update" element={<SecuredRoute roles={['ADMIN']}/>}>
                        <Route path="/officers/id/:officerId/update" element={<Officer key="update"/>}/>
                    </Route>
                    <Route path="/officers/id/:officerId" element={<SecuredRoute roles={['USER']}/>}>
                        <Route path="/officers/id/:officerId" element={<OfficerDetails/>}/>
                    </Route>
                    <Route path="/rooms" element={<SecuredRoute roles={['USER']}/>}>
                        <Route path="/rooms" element={<Rooms/>}/>
                    </Route>
                    <Route path="/cities" element={<SecuredRoute roles={['USER']}/>}>
                        <Route path="/cities" element={<Cities/>}/>
                    </Route>
                    <Route path="/rooms/:city" element={<SecuredRoute roles={['USER']}/>}>
                        <Route path="/rooms/:city" element={<Rooms/>}/>
                    </Route>
                    <Route path="/rooms/create" element={<SecuredRoute roles={['ADMIN']}/>}>
                        <Route path="/rooms/create" element={<Room key="create"/>}/>
                    </Route>
                    <Route path="/rooms/id/:roomId/update" element={<SecuredRoute roles={['ADMIN']}/>}>
                        <Route path="/rooms/id/:roomId/update" element={<Room key="update"/>}/>
                    </Route>
                    <Route path="/rooms/id/:roomId" element={<SecuredRoute roles={['USER']}/>}>
                        <Route path="/rooms/id/:roomId" element={<RoomDetails/>}/>
                    </Route>
                    <Route path="/login" element={<Login/>}/>

                </Routes>
            </Container>
        </>
    );
}
export default Content;