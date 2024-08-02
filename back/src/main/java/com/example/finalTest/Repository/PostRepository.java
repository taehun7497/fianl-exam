package com.example.finalTest.Repository;

import com.example.finalTest.Entity.Post;
import com.example.finalTest.Repository.Custom.PostRepositoryCustom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long>, PostRepositoryCustom {
    Page<Post> getList(Pageable pageable);
}
