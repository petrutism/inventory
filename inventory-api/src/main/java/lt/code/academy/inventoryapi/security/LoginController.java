package lt.code.academy.inventoryapi.security;

import static lt.code.academy.inventoryapi.Endpoint.*;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(LOGIN)
public class LoginController {
    @PostMapping
    public void login(){

    }
}
