package com.wed.controller;

import com.wed.entity.Preferences;
import com.wed.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/preferences")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> savePreferences(@RequestBody List<Preferences> preferencesList) {
        userService.saveUserPreferences(preferencesList);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/firstLogin")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> firstLogin() {
        Boolean firstLogin = userService.firstLogin();
        return ResponseEntity.ok(firstLogin);
    }

    @GetMapping("/getPreferences")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getPreferences() {
        List<Preferences> preferencesList = userService.getPreferences();
        return ResponseEntity.ok(preferencesList);
    }
}
