package com.wed.dto;

import lombok.Builder;

@Builder
public record LoginRequestDTO(String username, String password, String role) {

}