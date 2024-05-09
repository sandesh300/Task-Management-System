package taskmanagementsystem.service;

import taskmanagementsystem.dto.ApiResponse;
import taskmanagementsystem.model.Task;

public interface TaskService {
    ApiResponse createTask(Task task, Long userId);
}
