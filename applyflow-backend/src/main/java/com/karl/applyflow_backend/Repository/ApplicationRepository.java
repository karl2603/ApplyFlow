package com.karl.applyflow_backend.Repository;

import com.karl.applyflow_backend.Models.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Integer> {
    //Filter by employment type and application status
    @Query(value = "SELECT * FROM application WHERE type = :type AND status = :status", nativeQuery = true)
    public List<Application> filter(@Param("type") String employmentType, @Param("status") String status);
}
