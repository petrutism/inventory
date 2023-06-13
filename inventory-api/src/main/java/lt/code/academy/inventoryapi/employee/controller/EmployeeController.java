package lt.code.academy.inventoryapi.employee.controller;
import static lt.code.academy.inventoryapi.Endpoint.*;

import lt.code.academy.inventoryapi.employee.dto.Employee;
import lt.code.academy.inventoryapi.employee.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(EMPLOYEES)
public class EmployeeController {
    EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService){
        this.employeeService = employeeService;
    }
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Employee> getEmployees(){
        return employeeService.getAllEmployees();
    }
    @GetMapping(value = EMPLOYEE_BY_ID, produces = MediaType.APPLICATION_JSON_VALUE)
    public Employee getEmployeeById(@PathVariable(EMPLOYEE_ID)UUID id){
        return employeeService.getEmployeeById(id);
    }
    @GetMapping(value = EMPLOYEE_BY_FULL_NAME, produces = MediaType.APPLICATION_JSON_VALUE)
    public Employee getEmployeeByFullName(@PathVariable(EMPLOYEE_NAME) String name, @PathVariable(EMPLOYEE_SURNAME) String surname){
        return employeeService.findEmployeeByNameAndSurname(name, surname);
    }
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void createEmployee(@RequestBody Employee employee){
        employeeService.createEmployee(employee);
    }

    @PutMapping(value = EMPLOYEE_BY_ID, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateEmployee(@RequestBody Employee employee, @PathVariable(EMPLOYEE_ID) UUID id){
        employee.setId(id);
        employeeService.updateEmployee(employee);
    }

    @DeleteMapping(value = EMPLOYEE_BY_ID)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEmployee(@PathVariable(EMPLOYEE_ID) UUID employeeId){
        employeeService.deleteEmployee(employeeId);
    }
}
