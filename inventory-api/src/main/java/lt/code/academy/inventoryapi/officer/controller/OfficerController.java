package lt.code.academy.inventoryapi.officer.controller;
import static lt.code.academy.inventoryapi.Endpoint.*;

import lt.code.academy.inventoryapi.officer.dto.Officer;
import lt.code.academy.inventoryapi.officer.service.OfficerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(OFFICERS)
public class OfficerController {
    OfficerService officerService;

    public OfficerController(OfficerService officerService){
        this.officerService = officerService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Officer> getOfficers(){
        return officerService.getAllOfficers();
    }

    @GetMapping(value = OFFICER_BY_ID, produces = MediaType.APPLICATION_JSON_VALUE)
    public Officer getOfficerById(@PathVariable(OFFICER_ID) UUID id){
        return officerService.getOfficerById(id);
    }

    @GetMapping(value = OFFICER_BY_FULL_NAME, produces = MediaType.APPLICATION_JSON_VALUE)
    public Officer getOfficerByFullName(@PathVariable(OFFICER_NAME) String name, @PathVariable(OFFICER_SURNAME) String surname){
        return officerService.findOfficerByNameAndSurname(name, surname);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void createOfficer(@RequestBody Officer officer){
        officerService.createOfficer(officer);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping(value = OFFICER_BY_ID, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateOfficer(@RequestBody Officer officerFromForm, @PathVariable(OFFICER_ID) UUID id){
        officerFromForm.setId(id);
        officerService.updateOfficer(officerFromForm);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping(value = OFFICER_BY_ID)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOfficer(@PathVariable(OFFICER_ID) UUID id){
        officerService.deleteOfficer(id);
    }
}
