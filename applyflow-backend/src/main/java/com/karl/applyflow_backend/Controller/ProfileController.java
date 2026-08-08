package com.karl.applyflow_backend.Controller;

import com.karl.applyflow_backend.Service.ProfileImageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.IOException;

@RestController
@RequestMapping("/profileUpload")
@Slf4j
public class ProfileController {
    @Autowired
    private ProfileImageService profileImageService;

    @GetMapping("/{profileName}")
    public ResponseEntity<byte[]> getProfile(@PathVariable("profileName") String profileName) throws IOException {
        byte[] response = profileImageService.getProfileImage(profileName);
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.parseMediaType("image/jpeg")).body(response);
    }

    @PostMapping()
    public ResponseEntity<String> addProfileImage(@RequestParam("file") MultipartFile file) throws IOException {
        profileImageService.addProfileImage(file);
        return new ResponseEntity<>("Profile Picture Added Successfully", HttpStatus.CREATED);
    }
}
