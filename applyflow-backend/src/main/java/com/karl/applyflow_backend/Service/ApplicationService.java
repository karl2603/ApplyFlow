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
    //Get Method
    public List<Application> displayAllApplications(){
        return repository.findAll();
    }
    //Post Method
    public void addApplication(int id, String companyName, String role, String type, String location, String CTC, String status){
        Application newApplication = new Application(id, companyName, role, type, location, CTC, status);
        repository.save(newApplication);
    }
    //Put Method
    public void editApplication(int id, String companyName, String role, String type, String location, String CTC, String status){
        try{
            if(repository.existsById(id)){
                Application updateApplication = new Application(id, companyName, role, type, location, CTC, status);
                repository.save(updateApplication);
            }
            else{
                System.out.println("Id not found");
            }
        }
        catch (Exception e){
            System.out.println("Error"+e);
        }
    }

    public void deleteApplication(int id){
        repository.deleteById(id);
    }

}
