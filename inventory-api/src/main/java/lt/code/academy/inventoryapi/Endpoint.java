package lt.code.academy.inventoryapi;

public interface Endpoint {
    String ROOT = "/api";
    String ROOM_ID = "roomId";
    String ROOM_NUMBER = "roomNumber";
    String CITY = "city";
    String EMPLOYEE_ID = "employeeId";
    String EMPLOYEE_NAME = "employeeName";
    String EMPLOYEE_SURNAME = "employeeSurname";
    String OFFICER_ID = "officerId";
    String OFFICER_NAME = "officerName";
    String OFFICER_SURNAME = "officerSurname";
    String ROOMS = ROOT + "/rooms";
    String EMPLOYEES = ROOT + "/employees";
    String OFFICERS = ROOT + "/officers";
    String INVENTORY_ID = "inventoryId";
    String INVENTORIES = ROOT + "/inventories";
    String INVENTORY_BY_ID = "/id/{" + INVENTORY_ID + "}";
    String EMPLOYEE_BY_ID = "/id/{" + EMPLOYEE_ID + "}";
    String EMPLOYEE_BY_FULL_NAME = "/{" + EMPLOYEE_NAME + "}/{" + EMPLOYEE_SURNAME + "}";
    String OFFICER_BY_ID = "/id/{" + OFFICER_ID + "}";
    String OFFICER_BY_FULL_NAME = "/{" + OFFICER_NAME + "}/{" + OFFICER_SURNAME + "}";
    String ROOM_BY_ID = ROOMS + "/{" + ROOM_ID + "}";
    String ROOM_BY_NUMBER_AND_CITY = "/{" + ROOM_NUMBER + "}/{" + CITY + "}";
    String CITIES = "/cities";
    String ROOM_NUMBERS = "/{" + CITY + "}/roomNumbers";
}
