package com.karl.applyflow_backend.Service;

import com.karl.applyflow_backend.Models.Application;
import com.karl.applyflow_backend.Repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {
    @Autowired
    private ApplicationRepository repository;
    List<Application> displayAllApplication(){
        return repository.findAll();
    }
}
