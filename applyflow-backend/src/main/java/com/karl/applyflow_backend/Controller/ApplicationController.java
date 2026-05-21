package com.karl.applyflow_backend.Controller;

import com.karl.applyflow_backend.Models.Application;
import com.karl.applyflow_backend.Service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/applications")
public class ApplicationController {
    @Autowired
    private ApplicationService service;

    @GetMapping()
    public List<Application>  displayAllApplications(){
        return service.displayAllApplications();
    }

    @PostMapping("/newApplication")
    public void addApplication(@RequestParam("id") int id,@RequestParam("companyName") String companyName, @RequestParam("role") String role, @RequestParam("type") String type, @RequestParam("location") String location, @RequestParam("CTC") String CTC, @RequestParam("status") String status){
        service.addApplication(id, companyName, role, type, location, CTC, status);
    }

    @PutMapping("/editApplication")
    public void editApplication(@RequestParam("id") int id, @RequestParam("companyName") String companyName, @RequestParam("role") String role, @RequestParam("type") String type, @RequestParam("location") String location, @RequestParam("CTC") String CTC, @RequestParam("status") String status){
        service.editApplication(id, companyName, role, type, location, CTC, status);
    }

}
