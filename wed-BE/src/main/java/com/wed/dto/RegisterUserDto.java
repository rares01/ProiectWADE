package com.wed.dto;

import lombok.Builder;

@Builder
public record RegisterUserDto(String email,
                              String password) {
}
