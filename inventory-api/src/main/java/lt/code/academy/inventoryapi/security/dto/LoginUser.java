package lt.code.academy.inventoryapi.security.dto;

import lombok.Getter;
import lt.code.academy.inventoryapi.user.dto.Role;
import lt.code.academy.inventoryapi.user.dto.User;

import java.util.Set;
import java.util.stream.Collectors;
@Getter
public class LoginUser {
    private final String fullName;
    private final String username;
    private final Set<String> roles;

    public LoginUser(User user){
        fullName = user.getName() + " " + user.getSurname();
        username = user.getUsername();
        roles = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toSet());
    }
}
