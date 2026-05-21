package com.karl.applyflow_backend.Repository;

import com.karl.applyflow_backend.Models.Application;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationRepository extends JpaRepository<Application, Integer> {
}
