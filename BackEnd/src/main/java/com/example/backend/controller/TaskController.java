package com.example.backend.controller;

import com.example.backend.bean.Task;
import com.example.backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping( "/api/tasks" )
public class TaskController {
    @Autowired
    public TaskService taskService;

    @GetMapping(produces = "application/json")
    public List<Task> list() {
        return taskService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> find(@PathVariable Long id) {
        return ResponseEntity.of(taskService.find(id));
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public Task create(@RequestBody Task task) {
        taskService.saveTask(task);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/tasks/{id}")
                .buildAndExpand(task.getId())
                .toUri();
//        return ResponseEntity.created(location).build();
        ResponseEntity.created(location).build();
        return taskService.getLast();
    }

    @PutMapping(path = "/{id}", consumes = "application/json", produces = "application/json")
    public List<Task> update(@PathVariable Long id, @RequestBody Task task) {
        Optional<Task> updatedTask = taskService.update(new Task(id, task.getContent()));
        return taskService.getAll();
    }

    @DeleteMapping(path = "/{id}")
    public List<Task> delete(@PathVariable Long id) {
        Optional<Task> deletedTask = taskService.delete(id);
        if (deletedTask.isPresent()) {
            ResponseEntity.noContent().build();
            return taskService.getAll();
        }
        return taskService.getAll();
    }
}
