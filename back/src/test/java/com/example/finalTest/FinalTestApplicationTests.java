package com.example.finalTest;

import com.example.finalTest.Entity.Post;
import com.example.finalTest.Repository.PostRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class FinalTestApplicationTests {
    @Autowired
    private PostRepository postRepository;

    @Test
    void contextLoads() {
        for (int i = 0; i < 101; i++) {
            postRepository.save(Post.builder().title("페이징 테스트" + i).content("페이징 테스트" + i).build());
        }
    }
}
