package lt.code.academy.inventoryapi.security;

import static lt.code.academy.inventoryapi.Endpoint.*;

import lt.code.academy.inventoryapi.security.dto.LoginUser;
import lt.code.academy.inventoryapi.user.dto.User;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(LOGIN)
public class LoginController {
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public LoginUser login(@AuthenticationPrincipal User user) {
        return new LoginUser(user);
    }
}
