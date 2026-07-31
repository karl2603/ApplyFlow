package com.karl.applyflow_backend.Service;

import com.karl.applyflow_backend.DTOs.RequestDTOs.ApplicationRequest;
import com.karl.applyflow_backend.DTOs.ResponseDTOs.ApplicationResponse;
import com.karl.applyflow_backend.Models.Application;
import com.karl.applyflow_backend.Repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ApplicationService {
    @Autowired
    private ApplicationRepository repository;
    //Get Method
    public List<ApplicationResponse> displayAllApplications(){
        List<Application> applications = repository.findAll();
        List<ApplicationResponse> response = new ArrayList<>();
        for(int i=0; i<applications.size(); i++){
            Application application = applications.get(i);
            ApplicationResponse applicationResponse = new ApplicationResponse(application.getId(), application.getCompanyName(), application.getRole(), application.getType(), application.getLocation(), application.getCtc(), application.getStatus(), application.getCreatedAt(), application.getUpdatedAt());
            response.add(applicationResponse);
        }
        return response;
    }
    //Custom Native Query
    public List<ApplicationResponse> filter(String employmentType, String status){
        List<Application> applications = repository.filter(employmentType, status);
        List<ApplicationResponse> response = new ArrayList<>();
        for(int i=0; i<applications.size(); i++){
            Application application = applications.get(i);
            ApplicationResponse applicationResponse = new ApplicationResponse(application.getId(), application.getCompanyName(), application.getRole(), application.getType(), application.getLocation(), application.getCtc(), application.getStatus(), application.getCreatedAt(), application.getUpdatedAt());
            response.add(applicationResponse);
        }
        return response;
    }
    //Post Method
    public void addApplication(ApplicationRequest request){
        Application newApplication = new Application();
        newApplication.setCompanyName(request.getCompanyName());
        newApplication.setRole(request.getRole());
        newApplication.setType(request.getType());
        newApplication.setLocation(request.getLocation());
        newApplication.setCtc(request.getCtc());
        newApplication.setStatus(request.getStatus());
        newApplication.setCreatedAt(LocalDateTime.now());
        newApplication.setUpdatedAt(LocalDateTime.now());
        newApplication.setVersion(1);
        repository.save(newApplication);
    }
    //Put Method
    public void editApplication(int id, ApplicationRequest request){
        Application application = repository.findById(id).orElse(null);
        if(application == null){
            throw new NoSuchElementException();
        }
        application.setCompanyName(request.getCompanyName());
        application.setRole(request.getRole());
        application.setType(request.getType());
        application.setLocation(request.getLocation());
        application.setCtc(request.getCtc());
        application.setStatus(request.getStatus());
        application.setUpdatedAt(LocalDateTime.now());
        application.setVersion(application.getVersion()+1);
        repository.save(application);
    }
    //Delete Methods
    public void deleteApplication(int id){
        Application application = repository.findById(id).orElse(null);
        if(application == null){
            throw new NoSuchElementException();
        }
        repository.deleteById(id);
    }

}
