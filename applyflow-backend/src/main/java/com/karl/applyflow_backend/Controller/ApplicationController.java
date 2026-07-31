package com.karl.applyflow_backend.Controller;

import com.karl.applyflow_backend.DTOs.RequestDTOs.ApplicationRequest;
import com.karl.applyflow_backend.DTOs.ResponseDTOs.ApplicationResponse;
import com.karl.applyflow_backend.Models.Application;
import com.karl.applyflow_backend.Service.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5173/")
@RestController
@RequestMapping("/applications")
public class ApplicationController {
    @Autowired
    private ApplicationService service;

    @GetMapping()
    public List<ApplicationResponse> displayAllApplications(){
        return service.displayAllApplications();
    }

    @GetMapping("/filter")
    public List<ApplicationResponse> filter(@RequestParam("type") String employmentType, @RequestParam("status") String status){
        return service.filter(employmentType, status);
    }

    @PostMapping()
    public ResponseEntity<String> addApplication(@Valid @RequestBody ApplicationRequest userRequest){
        service.addApplication(userRequest);
        return new ResponseEntity<>("Application Created", HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> editApplication(@PathVariable("id") int id, @Valid @RequestBody ApplicationRequest userRequest){
        service.editApplication(id, userRequest);
        return new ResponseEntity<>("Application Modified", HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public void deleteApplication(@PathVariable("id") int id){
        service.deleteApplication(id);
    }
}
