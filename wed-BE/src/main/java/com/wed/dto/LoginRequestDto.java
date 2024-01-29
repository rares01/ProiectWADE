package com.wed.dto;

import lombok.Builder;

@Builder
public record LoginRequestDto(String username, String password, String role) {

}