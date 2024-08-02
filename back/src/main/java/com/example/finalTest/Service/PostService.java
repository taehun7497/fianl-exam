package com.example.finalTest.Service;

import com.example.finalTest.DTO.PostRequestDTO;
import com.example.finalTest.DTO.PostResponseDTO;
import com.example.finalTest.Entity.Post;
import com.example.finalTest.Exception.DataNotFoundException;
import com.example.finalTest.Repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;


    public void createPost(PostRequestDTO postRequestDTO){
        postRepository.save(Post.builder().title(postRequestDTO.title()).content(postRequestDTO.content()).build());
    }

    public PostResponseDTO updatePost(Long id, PostRequestDTO postRequestDTO) {
        Post post = postRepository.findById(id).orElseThrow(()-> new DataNotFoundException("해당하는 게시물이 없습니다."));
        post.setTitle(postRequestDTO.title());
        post.setContent(postRequestDTO.content());
        postRepository.save(post);
        return getDTO(post);
    }

    public PostResponseDTO getDTO(Post post){
        return PostResponseDTO.builder().id(post.getId()).content(post.getContent()).title(post.getTitle()).build();
    }

    public void deletePost(Long id) {
        Post post = postRepository.findById(id).orElseThrow(()-> new DataNotFoundException("해당하는 게시물이 없습니다."));
        postRepository.delete(post);
    }

    public Page<PostResponseDTO> getList(int page) {
        Pageable pageable = PageRequest.of(page,10);
        Page<Post> postList = postRepository.getList(pageable);
        return new PageImpl<>(postList.stream().map(this::getDTO).toList(),pageable,postList.getTotalElements());
    }
}