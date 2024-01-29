package com.wed.service.interfaces;

import com.wed.dto.LoginRequestDTO;
import com.wed.dto.LoginResponseDTO;
import com.wed.exception.InvalidRoleException;

public interface AuthenticationService {

    LoginResponseDTO authenticateByRole(LoginRequestDTO loginRequestDTO) throws InvalidRoleException;
}
