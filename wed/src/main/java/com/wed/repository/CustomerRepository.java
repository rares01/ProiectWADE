package com.wed.repository;

import com.wed.entity.Customer;
import org.socialsignin.spring.data.dynamodb.repository.DynamoDBCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends
        DynamoDBCrudRepository<Customer, String> {

}
