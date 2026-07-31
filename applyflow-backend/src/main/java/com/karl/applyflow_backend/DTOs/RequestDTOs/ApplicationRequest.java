package com.karl.applyflow_backend.DTOs.RequestDTOs;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ApplicationRequest {
    @NotBlank(message = "Enter Company Name")
    @Size(max = 50)
    private String companyName;
    @NotBlank(message = "Enter Job Role")
    @Size(max = 50)
    private String role;
    @NotBlank(message = "Choose Employment Type")
    private String type;
    @NotBlank(message = "Enter Job Location")
    @Size(max = 100)
    private String location;
    @Positive(message = "CTC must be greater than 0")
    @Max(value = 2147483646, message = "Enter Valid CTC")
    private int ctc;
    @NotBlank(message = "Enter Job Status")
    private String status;
}
