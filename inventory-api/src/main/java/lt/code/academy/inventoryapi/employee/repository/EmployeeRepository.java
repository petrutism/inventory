package lt.code.academy.inventoryapi.employee.repository;

import lt.code.academy.inventoryapi.employee.entity.EmployeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface EmployeeRepository extends JpaRepository<EmployeeEntity, UUID> {
    Optional<EmployeeEntity> findByNameAndSurname(String name, String surname);
}
