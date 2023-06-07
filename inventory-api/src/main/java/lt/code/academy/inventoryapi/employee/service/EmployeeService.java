package lt.code.academy.inventoryapi.employee.service;

import lt.code.academy.inventoryapi.employee.dto.Employee;
import lt.code.academy.inventoryapi.employee.entity.EmployeeEntity;
import lt.code.academy.inventoryapi.exception.EmployeeDoesNotExistByIdRuntimeException;
import lt.code.academy.inventoryapi.exception.EmployeeDoesNotExistByNameAndSurnameRuntimeException;
import lt.code.academy.inventoryapi.employee.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class EmployeeService {
    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public void createEmployee(Employee employee) {
        employeeRepository.save(EmployeeEntity.convert(employee));
    }
    public void updateEmployee(Employee employee) {
        getEmployeeById(employee.getId());
        employeeRepository.save(EmployeeEntity.convert(employee));
    }
    public void deleteEmployee (UUID id){
        employeeRepository.deleteById(id);
    }

    public Employee getEmployeeById(UUID id) {
        return employeeRepository.findById(id)
                .map(Employee::convert)
                .orElseThrow(() -> new EmployeeDoesNotExistByIdRuntimeException(id));
    }

    public Employee findEmployeeByNameAndSurname(String name, String surname) {
        return employeeRepository.findByNameAndSurname(name, surname)
                .map(Employee::convert)
                .orElseThrow(() -> new EmployeeDoesNotExistByNameAndSurnameRuntimeException(name, surname));
    }
    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll()
                .stream()
                .map(Employee::convert)
                .toList();
    }
}
