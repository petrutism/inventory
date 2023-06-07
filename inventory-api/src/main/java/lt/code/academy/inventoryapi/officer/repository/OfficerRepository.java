package lt.code.academy.inventoryapi.officer.repository;

import lt.code.academy.inventoryapi.employee.entity.EmployeeEntity;
import lt.code.academy.inventoryapi.officer.entity.OfficerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface OfficerRepository extends JpaRepository<OfficerEntity, UUID> {
    Optional<OfficerEntity> findByNameAndSurname(String name, String surname);
}
