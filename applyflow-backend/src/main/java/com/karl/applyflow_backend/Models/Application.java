package com.karl.applyflow_backend.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Primary;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Application {
    @Id
    private int id;
    private String companyName;
    private String role;
    private String type;
    private String location;
    private String appliedDate;
    private String status;
}
