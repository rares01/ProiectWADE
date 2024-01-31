package com.wed.service.interfaces;

import com.wed.dto.LoginRequestDto;
import com.wed.dto.LoginResponseDto;
import com.wed.dto.RegisterUserDto;
import com.wed.exception.DtoValidateAlreadyExistsException;
import com.wed.exception.DtoValidateException;
import com.wed.exception.InvalidRoleException;

public interface AuthenticationService {

    LoginResponseDto authenticateByRole(LoginRequestDto loginRequestDTO) throws InvalidRoleException;

    void save(RegisterUserDto registerUserDto)
            throws DtoValidateException, DtoValidateAlreadyExistsException;
}
