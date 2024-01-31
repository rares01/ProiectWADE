package com.wed.repository;

import com.wed.entity.User;
import org.socialsignin.spring.data.dynamodb.repository.DynamoDBCrudRepository;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
@EnableScan()
public interface UserRepository extends DynamoDBCrudRepository<User, UUID> {
    Optional<User> findByUsername(String username);

}
