package com.example.finalTest.DTO;

import lombok.Builder;

@Builder
public record PostResponseDTO(Long id, String title, String content) {
}