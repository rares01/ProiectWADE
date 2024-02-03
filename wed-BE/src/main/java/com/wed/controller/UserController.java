package com.wed.controller;

import com.wed.dto.LoginResponseDto;
import com.wed.entity.Preferences;
import com.wed.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/preferences")
    public ResponseEntity<?> savePreferences(@RequestBody List<Preferences> preferencesList) {
        userService.saveUserPreferences(preferencesList);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/firstLogin")
    public ResponseEntity<?> firstLogin() {
        Boolean firstLogin = userService.firstLogin();
        return ResponseEntity.ok(firstLogin);
    }
}
