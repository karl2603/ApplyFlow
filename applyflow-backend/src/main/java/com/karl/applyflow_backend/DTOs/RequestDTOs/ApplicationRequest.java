package com.karl.applyflow_backend.DTOs.RequestDTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ApplicationRequest {
    private String companyName;
    private String role;
    private String type;
    private String location;
    private int ctc;
    private String status;
}
