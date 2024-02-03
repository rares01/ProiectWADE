package com.wed.service.impl;

import com.wed.authentication.JwtUtil;
import com.wed.dto.LoginResponseDto;
import com.wed.dto.RegisterUserDto;
import com.wed.entity.Preferences;
import com.wed.entity.User;
import com.wed.exception.DtoValidateException;
import com.wed.repository.UserRepository;
import com.wed.service.interfaces.UserService;
import com.wed.util.ModelConverter;
import io.micrometer.observation.annotation.Observed;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.wed.service.impl.AuthenticationServiceImpl.setClaims;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public void saveUser(RegisterUserDto registerUserDto) throws DtoValidateException {
        User user = validator(registerUserDto);
        userRepository.save(user);
    }

    @Override
    public Boolean firstLogin() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return user.getFirstLogin();
    }
    @Override
    public User updateFirstLogin(User user) {
        
        if(user.getFirstLogin()) {
            user.setFirstLogin(false);
            userRepository.save(user);
        }
        return user;
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public void saveUserPreferences(List<Preferences> preferencesList) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        user = updateFirstLogin(user);

        user.setPreferences(preferencesList);
        userRepository.save(user);
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
