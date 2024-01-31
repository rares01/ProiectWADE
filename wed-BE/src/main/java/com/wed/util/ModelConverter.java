package com.wed.util;

import com.wed.dto.RegisterUserDto;
import com.wed.entity.User;

import java.util.UUID;

public class ModelConverter {

    public static User registerUserToEntity(RegisterUserDto registerUserDto, String password) {
        return User.builder()
                .username(registerUserDto.email())
                .password(password)
                .role("ROLE_USER")
                .build();
    }
}
