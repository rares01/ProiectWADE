package com.wed.service.interfaces;

import com.wed.dto.RegisterUserDto;
import com.wed.entity.User;
import com.wed.exception.DtoValidateException;

import java.util.Optional;

public interface UserService {

    void saveUser(RegisterUserDto registerUserDto) throws DtoValidateException;
    Optional<User> findByUsername(String username);
}
