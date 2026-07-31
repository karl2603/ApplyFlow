package com.karl.applyflow_backend.DTOs.ResponseDTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ApplicationResponse {
    private String companyName;
    private String role;
    private String type;
    private String location;
    private int ctc;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
