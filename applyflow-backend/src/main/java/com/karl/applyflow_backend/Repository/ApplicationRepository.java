package com.karl.applyflow_backend.Repository;

import com.karl.applyflow_backend.Models.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Integer> {
    @Query(value = "SELECT * FROM application WHERE type = :type", nativeQuery = true)
    public List<Application> filterByType(@Param("type") String employmentType);
}
