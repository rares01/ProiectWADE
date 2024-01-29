package com.wed.controller;

import com.wed.entity.Customer;
import com.wed.service.interfaces.AuthenticationService;
import com.wed.service.impl.CustomerService;
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
    private CustomerService customerService;

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping
    public ResponseEntity<?> login(@RequestBody Customer customer) {
        Customer customerResponse = customerService.createCustomer(customer);
        return ResponseEntity.ok(customerResponse);
    }
}
