package lt.code.academy.inventoryapi.officer.service;

import lt.code.academy.inventoryapi.officer.dto.Officer;
import lt.code.academy.inventoryapi.officer.entity.OfficerEntity;
import lt.code.academy.inventoryapi.exception.OfficerDoesNotExistByIdRuntimeException;
import lt.code.academy.inventoryapi.exception.OfficerDoesNotExistByNameAndSurnameRuntimeException;
import lt.code.academy.inventoryapi.officer.repository.OfficerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class OfficerService {
    private final OfficerRepository officerRepository;

    public OfficerService(OfficerRepository officerRepository) {
        this.officerRepository = officerRepository;
    }

    public void createOfficer(Officer officer) {
        officerRepository.save(OfficerEntity.convert(officer));
    }
    public void updateOfficer(Officer officer) {
        getOfficerById(officer.getId());
        officerRepository.save(OfficerEntity.convert(officer));
    }

    public Officer getOfficerById(UUID id) {
        return officerRepository.findById(id)
                .map(Officer::convert)
                .orElseThrow(() -> new OfficerDoesNotExistByIdRuntimeException(id));
    }

    public Officer findOfficerByNameAndSurname(String name, String surname) {
        return officerRepository.findByNameAndSurname(name, surname)
                .map(Officer::convert)
                .orElseThrow(() -> new OfficerDoesNotExistByNameAndSurnameRuntimeException(name, surname));
    }

    public List<Officer> getAllOfficers(){
        return officerRepository.findAll()
                .stream()
                .map(Officer::convert)
                .toList();
    }
    public void deleteOfficer(UUID id){
        officerRepository.deleteById(id);
    }
}
