package com.karl.applyflow_backend.Controller;

import com.karl.applyflow_backend.Service.ProfileImageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/profileUpload")
@Slf4j
public class ProfileController {
    @Autowired
    private ProfileImageService profileImageService;

    @GetMapping("/{profileName}")
    public byte[] getProfile(@PathVariable("profileName") String profileName) throws IOException {
        return profileImageService.getProfileImage(profileName);
    }

    @PostMapping()
    public ResponseEntity<String> addProfileImage(@RequestParam MultipartFile file) throws IOException {
        profileImageService.addProfileImage(file);
        return new ResponseEntity<>("Profile Picture Added Successfully", HttpStatus.CREATED);
    }
}
