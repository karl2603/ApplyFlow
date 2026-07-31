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
        List<Application> applications = repository.findAll();
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
    public void editApplication(int id, String companyName, String role, String type, String location, String CTC, String status){

    }
    //Delete Methods
    public void deleteApplication(int id){
        repository.deleteById(id);
    }

}
