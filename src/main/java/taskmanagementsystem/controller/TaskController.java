package taskmanagementsystem.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import taskmanagementsystem.dto.ApiResponse;
import taskmanagementsystem.model.Task;
import taskmanagementsystem.service.TaskService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tasks")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @PostMapping("/user/{id}")
    public ResponseEntity<ApiResponse> createTask(@Valid @RequestBody Task task, @PathVariable("id") Long userId) {
        return new ResponseEntity<>(service.createTask(task, userId), HttpStatus.CREATED);
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<ApiResponse> getTaskById(@PathVariable Integer taskId) {
       return new ResponseEntity<>(service.getTaskById(taskId), HttpStatus.OK);
    }

}
