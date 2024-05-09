package taskmanagementsystem.service.impl;

import org.springframework.stereotype.Service;
import taskmanagementsystem.dto.ApiResponse;
import taskmanagementsystem.exception.ResourceNotFoundException;
import taskmanagementsystem.model.Task;
import taskmanagementsystem.model.User;
import taskmanagementsystem.repository.TaskRepository;
import taskmanagementsystem.repository.UserRepository;
import taskmanagementsystem.service.TaskService;

@Service
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskServiceImpl(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    @Override
    public ApiResponse createTask(Task task, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(()->new ResourceNotFoundException("User not found, Id: "+userId));
        task.setUser(user);

        Task savedTask = taskRepository.save(task);
        return new ApiResponse("Task Saved", savedTask);
    }
}
