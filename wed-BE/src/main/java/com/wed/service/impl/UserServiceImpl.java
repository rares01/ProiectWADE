package com.wed.service.impl;

import com.wed.dto.RegisterUserDto;
import com.wed.entity.User;
import com.wed.exception.DtoValidateException;
import com.wed.repository.UserRepository;
import com.wed.service.interfaces.UserService;
import com.wed.util.ModelConverter;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void saveUser(RegisterUserDto registerUserDto) throws DtoValidateException {
        User user = validator(registerUserDto);
        userRepository.save(user);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    private User validator(RegisterUserDto registerUserDto) throws DtoValidateException {
        if (StringUtils.isBlank(registerUserDto.email())) {
            throw new DtoValidateException("Test");
        }
        if (StringUtils.isBlank(registerUserDto.password())) {
            throw new DtoValidateException("Test");
        }

        return ModelConverter.registerUserToEntity(registerUserDto, passwordEncoder.encode(registerUserDto.password()));
    }
}
