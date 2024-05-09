package taskmanagementsystem.service;

import taskmanagementsystem.dto.ApiResponse;
import taskmanagementsystem.model.Task;

import java.util.List;

public interface TaskService {
    ApiResponse createTask(Task task, Long userId);

    ApiResponse getTaskById(Integer taskId);

    List<Task> getAllTasks(Long userId);

    ApiResponse updateTask(Task task, Integer id);

}
