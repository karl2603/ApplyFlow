package com.karl.applyflow_backend.Service;

import com.karl.applyflow_backend.Repository.ProfileImageRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
public class ProfileImageService {
    @Autowired
    private ProfileImageRepository profileImageRepository;

    public void addProfileImage(MultipartFile file){
        private String fileSystemPath =  
    }
}
