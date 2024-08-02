package com.example.finalTest.Repository.Custom;

import com.example.finalTest.Entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostRepositoryCustom {

    Page<Post> getList(Pageable pageable);
}