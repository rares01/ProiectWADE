package com.wed.service.impl;

import com.wed.authentication.JwtUtil;
import com.wed.dto.LoginRequestDTO;
import com.wed.dto.LoginResponseDTO;
import com.wed.entity.RegisterUserDto;
import com.wed.entity.User;
import com.wed.exception.AuthenticationLoginException;
import com.wed.exception.DtoValidateAlreadyExistsException;
import com.wed.exception.DtoValidateException;
import com.wed.exception.InvalidRoleException;
import com.wed.service.interfaces.AuthenticationService;
import com.wed.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;


@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserService userService;


    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public LoginResponseDTO authenticateByRole(LoginRequestDTO loginRequestDTO) throws InvalidRoleException {
        final User userDetails = (User) userDetailsService.loadUserByUsername(loginRequestDTO.username());
        boolean isRoleValid = userDetails.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals(loginRequestDTO.role()));

        if (!isRoleValid) {
            throw new InvalidRoleException("Unexpected role");
        }
        Map<String, Object> extraClaims = setClaims(userDetails);
        String token = jwtUtil.generateToken(extraClaims, userDetails);

        return LoginResponseDTO.builder()
                .token(token)
                .build();

    }

    public void save(RegisterUserDto registerUserDto)
            throws DtoValidateException, DtoValidateAlreadyExistsException {
        Optional<User> user = userService.findByUsername(registerUserDto.email());

        if (user.isPresent()) {
            throw new DtoValidateAlreadyExistsException("Test");
        }

        userService.saveUser(registerUserDto);
    }


    private void authenticate(LoginRequestDTO loginRequestDTO) throws AuthenticationLoginException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequestDTO.username(), loginRequestDTO.password()));
        } catch (DisabledException e) {
            throw new AuthenticationLoginException("USER_DISABLED");
        } catch (BadCredentialsException e) {
            throw new AuthenticationLoginException("INVALID_CREDENTIALS");
        }
    }

    public static Map<String, Object> setClaims(User userDetails) {
        Map<String, Object> extraClaims = new HashMap<>();

        extraClaims.put("userId", userDetails.getId());
        extraClaims.put("username", userDetails.getUsername());
        extraClaims.put("role", userDetails.getRole());

        return extraClaims;
    }
}
