package com.example.finalTest.Controller;

import com.example.finalTest.DTO.PostRequestDTO;
import com.example.finalTest.DTO.PostResponseDTO;
import com.example.finalTest.Exception.DataNotFoundException;
import com.example.finalTest.Service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PostController {
    private final PostService postService;

    @PostMapping
    public ResponseEntity<?> createPost(@RequestBody PostRequestDTO postRequestDTO) {
        postService.createPost(postRequestDTO);
        return ResponseEntity.status(HttpStatus.OK).body("create!");
    }

    @PutMapping
    public ResponseEntity<?> updatePost(@RequestHeader("id") Long id, @RequestBody PostRequestDTO postRequestDTO) {
        try {
            PostResponseDTO postResponseDTO = postService.updatePost(id, postRequestDTO);
            return ResponseEntity.status(HttpStatus.OK).body(postResponseDTO);
        } catch (DataNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @DeleteMapping
    public ResponseEntity<?> deletePost(@RequestHeader("id") Long id) {
        postService.deletePost(id);
        return ResponseEntity.status(HttpStatus.OK).body("delete!");
    }

    @GetMapping
    public ResponseEntity<?> postList(@RequestHeader("page") int page) {
        Page<PostResponseDTO> postResponseDTOS = postService.getList(page);
        return ResponseEntity.status(HttpStatus.OK).body(postResponseDTOS);
    }
}