package com.example.reto3k.reto3;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;
 //Es un controlador rest
@RestController
public class UserController { 
    @GetMapping("/user") //Mapeo get
    public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {        
        return Collections.singletonMap("name", principal.getAttribute("name"));
    }
}
