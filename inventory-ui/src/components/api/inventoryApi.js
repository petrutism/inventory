import HTTP from "./index";

const getEmployees = () => HTTP.get('/employees');
const getOfficers = () => HTTP.get('/officers');
const getRooms = () => HTTP.get('/rooms');
const saveEmployee = (employee) => HTTP.post('/employees', employee);
const getInventories = () => HTTP.get('/inventories');
const getCities = () => HTTP.get('/rooms/cities');
const getRoomNumbers = (city) => HTTP.get(`/rooms/${city}/roomNumbers`);

export {
    getEmployees,
    getInventories,
    getRooms,
    saveEmployee,
    getOfficers,
    getCities,
    getRoomNumbers
}