package com.wed.dto;

import lombok.Builder;

@Builder
public record LoginResponseDTO(String token) {
}
