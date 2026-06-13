package com.karl.applyflow_backend.Repository;

import com.karl.applyflow_backend.Models.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Integer> {
    //Filter By Employment Type
    @Query(value = "SELECT * FROM application WHERE type = :type", nativeQuery = true)
    public List<Application> filterByType(@Param("type") String employmentType);
    //Filter By Application Status
    @Query(value = "SELECT * FROM application WHERE status = :status", nativeQuery = true)
    public List<Application> filterByStatus(@Param("status") String status);
    
}
