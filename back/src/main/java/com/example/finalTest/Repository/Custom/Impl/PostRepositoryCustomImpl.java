package com.example.finalTest.Repository.Custom.Impl;

import com.example.finalTest.Entity.Post;
import com.example.finalTest.Entity.QPost;
import com.example.finalTest.Repository.Custom.PostRepositoryCustom;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

@RequiredArgsConstructor
public class PostRepositoryCustomImpl implements PostRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    QPost qPost = QPost.post;

    public Page<Post> getList(Pageable pageable) {
        QueryResults<Post> queryResults = jpaQueryFactory.selectFrom(qPost)
                .orderBy(qPost.createDate.asc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();

        return new PageImpl<>(queryResults.getResults(), pageable, queryResults.getTotal());
    }
}