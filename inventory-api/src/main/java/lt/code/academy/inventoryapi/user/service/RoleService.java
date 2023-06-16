package lt.code.academy.inventoryapi.user.service;

import lt.code.academy.inventoryapi.user.dto.Role;
import lt.code.academy.inventoryapi.user.entity.RoleEntity;
import lt.code.academy.inventoryapi.user.repository.RoleRepository;
import org.springframework.stereotype.Service;

@Service
public class RoleService {
    private final RoleRepository roleRepository;
    public RoleService(RoleRepository roleRepository){
        this.roleRepository = roleRepository;
    }

    public Role saveRole(Role role){
        return Role.convert(roleRepository.save(RoleEntity.convert(role)));
    }

    public Role findByName(String name){
        return Role.convert(roleRepository.findByName(name));
    }
}
