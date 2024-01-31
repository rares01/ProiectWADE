package com.wed.controller;

import com.wed.dto.LoginRequestDto;
import com.wed.dto.LoginResponseDto;
import com.wed.dto.RegisterUserDto;
import com.wed.exception.DtoValidateAlreadyExistsException;
import com.wed.exception.DtoValidateException;
import com.wed.exception.InvalidRoleException;
import com.wed.service.interfaces.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/authenticate")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterUserDto registerUserDto) throws DtoValidateException, DtoValidateAlreadyExistsException {
        authenticationService.save(registerUserDto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto loginRequestDTO) throws InvalidRoleException {
        LoginResponseDto loginResponseDTO = authenticationService.authenticateByRole(loginRequestDTO);
        return ResponseEntity.ok(loginResponseDTO);
    }
}
