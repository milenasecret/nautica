package com.nautica.service;

import com.nautica.dto.FileResponse;
import com.nautica.model.FileEntity;
import com.nautica.model.User;
import com.nautica.repository.FileRepository;
import com.nautica.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FileService {
    private final FileRepository fileRepository;
    private final UserRepository userRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    //Upload a new file
    public FileResponse uploadFile(MultipartFile file, String username) throws IOException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Create upload directory if needed
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generate unique filename
        String originalFilename = file.getOriginalFilename();
        String uniqueFilename = UUID.randomUUID() + "_" + originalFilename;
        Path filePath = uploadPath.resolve(uniqueFilename);

        // Save file to disk
        Files.copy(file.getInputStream(), filePath);

        // Save metadata to database
        FileEntity fileEntity = new FileEntity();
        fileEntity.setFilename(originalFilename);
        fileEntity.setFilepath(filePath.toString());
        fileEntity.setFilesize(file.getSize());
        fileEntity.setFiletype(file.getContentType());
        fileEntity.setUser(user);

        fileRepository.save(fileEntity);

        return toFileResponse(fileEntity);
    }

    // Get all files for a user
    public List<FileResponse> getAllFiles() {
        return fileRepository.findAll()
                .stream()
                .map(this::toFileResponse)
                .collect(Collectors.toList());
    }

    //Download a file

    public Resource downloadFile(Long fileId) {
        FileEntity fileEntity = fileRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found"));
        try {
            Path filePath = Paths.get(fileEntity.getFilepath());
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("File not found");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error loading file: " + e.getMessage());
        }
    }

    //Get file metadata (for download headers)
    public FileEntity getFileMetadata(Long fileId) {
        return fileRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found"));
    }

    //Delete a file
    public void deleteFile(Long fileId) {
        FileEntity fileEntity = fileRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found"));

        // Delete physical file
        try {
            Path filePath = Paths.get(fileEntity.getFilepath());
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            throw new RuntimeException("Error deleting file: " + e.getMessage());
        }

        // Delete from database
        fileRepository.delete(fileEntity);
    }

    private FileResponse toFileResponse(FileEntity entity) {
        return new FileResponse(
                entity.getId(),
                entity.getFilename(),
                entity.getFilesize(),
                entity.getFiletype(),
                entity.getUploadedAt().toString(),
                entity.getUser().getUsername()
        );
    }
}
