package com.example.backend.bean;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class Task {
    private long id;
    private String content;
    private long done;

    public long getDone() {
        return done;
    }

    public void setDone(long done) {
        this.done = done;
    }

    private LocalDateTime updatedAt;

    public Task() {
    }

    public Task(Long id, String content) {
        this.id = id;
        this.content = content;
    }

    public long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt() {
        this.updatedAt = LocalDateTime.now();
    }

    public void setContent(String content) {
        this.content = content;
    }
}