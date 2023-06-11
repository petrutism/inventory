import HTTP from "./index";

const getEmployees = () => HTTP.get('/employees');
const getOfficers = () => HTTP.get('/officers');
const getRooms = () => HTTP.get('/rooms');
const saveEmployee = (employee) => HTTP.post('/employees', employee);
const getInventories = () => HTTP.get('/inventories');
const saveInventory = (inventoryFromForm) => HTTP.post('/inventories', inventoryFromForm);
const updateInventory = (inventoryFromForm, inventoryId) => HTTP.put(`/inventories/id/${inventoryId}`, inventoryFromForm);

const getInventoryById = (inventoryId) => HTTP.get(`/inventories/id/${inventoryId}`);
const getCities = () => HTTP.get('/rooms/cities');
const getRoomNumbers = (city) => HTTP.get(`/rooms/${city}/roomNumbers`);

export {
    getEmployees,
    getInventories,
    getRooms,
    saveEmployee,
    getOfficers,
    getCities,
    getRoomNumbers,
    saveInventory,
    getInventoryById,
    updateInventory
}