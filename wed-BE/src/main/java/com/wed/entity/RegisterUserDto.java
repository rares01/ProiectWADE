package com.wed.entity;

import lombok.Builder;

@Builder
public record RegisterUserDto(String email,
                              String password) {
}
