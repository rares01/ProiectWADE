package com.wed.entity;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBIgnore;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;

import java.util.Collection;
import java.util.Collections;

@Data
@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
@DynamoDbBean
@DynamoDBTable(tableName = "User")
public class User implements UserDetails {

    @Getter(onMethod = @__({@DynamoDbPartitionKey, @DynamoDBHashKey}))
    private String username;
    private String password;
    private String role;
    @Override
    @DynamoDBIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(getRole()));
    }

    @Override
    @DynamoDBIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @DynamoDBIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @DynamoDBIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @DynamoDBIgnore
    public boolean isEnabled() {
        return true;
    }
}
