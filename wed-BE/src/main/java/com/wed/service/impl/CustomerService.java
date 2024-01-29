package com.wed.service.impl;

import com.wed.entity.Customer;
import com.wed.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public Customer createCustomer(final Customer customer) {
        return customerRepository.save(customer);
    }
}
