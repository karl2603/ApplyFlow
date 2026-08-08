package com.karl.applyflow_backend.Controller;

import com.karl.applyflow_backend.Service.ProfileImageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/profileUpload")
@Slf4j
public class ProfileController {
    @Autowired
    private ProfileImageService profileImageService;

    @GetMapping("/{profileName}")
    public byte[] getProfile(@PathVariable("profileName") String profileName){
        return profileImageService.getProfile(profileName);
    }

    @PostMapping()
    public ResponseEntity<String> addProfileImage(MultipartFile file){
        profileImageService.addProfileImage(file);
        return new ResponseEntity<>("Profile Picture Added Successfully", HttpStatus.CREATED);
    }
}
