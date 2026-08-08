package com.karl.applyflow_backend.Service;

import com.karl.applyflow_backend.Models.ProfileImage;
import com.karl.applyflow_backend.Repository.ProfileImageRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@Service
@Slf4j
public class ProfileImageService {
    @Autowired
    private ProfileImageRepository profileImageRepository;

    private final String fileSystemPath =  "D:/Desktop/ApplyFlow/applyflow-backend/File System/";

    public byte[] getProfileImage(String profileName) throws IOException {
        ProfileImage profileImage = profileImageRepository.findByName(profileName);
        String filePath = fileSystemPath+profileImage.getFilePath();
        byte[] responseImage = Files.readAllBytes(new File(filePath).toPath());
        log.info("Profile Picture name = {} retrieved successfully", profileName);
        return responseImage;
    }

    public void addProfileImage(MultipartFile file) throws IOException {
         ProfileImage profileImage = new ProfileImage();

         String filePath = file.getOriginalFilename();

         profileImage.setName(file.getOriginalFilename());
         profileImage.setType(file.getContentType());
         profileImage.setFilePath(filePath);

         file.transferTo(new File(fileSystemPath+filePath));
         log.info("File stored successfully in File System");

         profileImageRepository.save(profileImage);
    }

}
