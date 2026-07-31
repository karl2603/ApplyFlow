    package com.karl.applyflow_backend.Models;

    import jakarta.persistence.Entity;
    import jakarta.persistence.GeneratedValue;
    import jakarta.persistence.GenerationType;
    import jakarta.persistence.Id;
    import lombok.AllArgsConstructor;
    import lombok.Data;
    import lombok.NoArgsConstructor;

    import java.time.*;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Entity
    public class Application {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int id;
        private String companyName;
        private String role;
        private String type;
        private String location;
        private int ctc;
        private String status;
        //Filled by backend
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private int version;
    }
