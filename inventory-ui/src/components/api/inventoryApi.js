import HTTP from "./index";

const getEmployees = () => HTTP.get('/employees');
const getOfficers = () => HTTP.get('/officers');
const getRooms = () => HTTP.get('/rooms');
const getRoomById = (roomId) => HTTP.get(`/rooms/id/${roomId}`);
const saveRoom = (roomFromForm) => HTTP.post('/rooms', roomFromForm);
const updateRoom = (roomFromForm, roomId) => HTTP.put(`/rooms/id/${roomId}`, roomFromForm);
const deleteRoom = (roomId) => HTTP.delete(`/rooms/id/${roomId}`);

const saveEmployee = (employee) => HTTP.post('/employees', employee);
const updateEmployee = (employeeFromForm, employeeId) => HTTP.put(`/employees/id/${employeeId}`, employeeFromForm);
const getEmployeeById = (employeeId) => HTTP.get(`/employees/id/${employeeId}`);
const deleteEmployee = (employeeId) => HTTP.delete(`/employees/id/${employeeId}`);

const saveOfficer = (officer) => HTTP.post('/officers', officer);
const updateOfficer = (officerFromForm, officerId) => HTTP.put(`/officers/id/${officerId}`, officerFromForm);
const getOfficerById = (officerId) => HTTP.get(`/officers/id/${officerId}`);
const deleteOfficer = (officerId) => HTTP.delete(`/officers/id/${officerId}`);


const getInventories = () => HTTP.get('/inventories');
const saveInventory = (inventoryFromForm) => HTTP.post('/inventories', inventoryFromForm);
const updateInventory = (inventoryFromForm, inventoryId) => HTTP.put(`/inventories/id/${inventoryId}`, inventoryFromForm);

const deleteInventory = (inventoryId) => HTTP.delete(`/inventories/id/${inventoryId}`);

const getInventoryById = (inventoryId) => HTTP.get(`/inventories/id/${inventoryId}`);
const getCities = () => HTTP.get('/rooms/cities');
const getRoomNumbers = (city) => HTTP.get(`/rooms/${city}/roomNumbers`);

export {
    getEmployees,
    saveEmployee,
    updateEmployee,
    getEmployeeById,
    deleteEmployee,
    saveOfficer,
    updateOfficer,
    getOfficerById,
    deleteOfficer,
    getInventories,
    getRooms,
    getRoomById,
    saveRoom,
    updateRoom,
    deleteRoom,
    getOfficers,
    getCities,
    getRoomNumbers,
    saveInventory,
    getInventoryById,
    updateInventory,
    deleteInventory
}