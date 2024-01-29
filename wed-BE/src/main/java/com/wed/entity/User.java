package com.wed.entity;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.UUID;

@Data
@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
@DynamoDBTable(tableName = "User")
public class User implements UserDetails {

    @DynamoDBHashKey(attributeName = "PK")
    private UUID id;
    @DynamoDBAttribute(attributeName = "Username")
    private String username;

    @DynamoDBAttribute(attributeName = "Password")
    private String password;

    @DynamoDBAttribute(attributeName = "Role")
    private String role;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(getRole()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
