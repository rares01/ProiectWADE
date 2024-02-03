package com.wed.controller;

import com.wed.dto.LoginResponseDto;
import com.wed.entity.Preferences;
import com.wed.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/preferences")
    public ResponseEntity<?> savePreferences(@RequestBody List<Preferences> preferencesList) {
        LoginResponseDto loginResponseDto = userService.saveUserPreferences(preferencesList);
        return ResponseEntity.ok(loginResponseDto);
    }
}
