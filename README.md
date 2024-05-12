
## API Endpoints Documentation

### 1. Create Task

- **Endpoint:** `POST http://localhost:8080/api/v1/tasks/user/1`
- **Description:** Creates a new task for the specified user.
- **Request Body:**
  ```json
  {
    "task": "go to swim",
    "details": "go to swim"
  }
 - **Response Body:**
   ```json
   {
    "message": "Task Saved",
   "data": {
    "id": 1,
    "task": "go to swim",
    "details": "go to swim",
    "completed": false,
    "taskCreatedAt": "Timestamp",
    "user": {
      "userId": 1,
      "username": "sandesh",
      "email": "sandesh@gmail.com"
        }
      }
   }


### 2. Get Task by ID
- **Endpoint**: GET- `http://localhost:8080/api/v1/tasks/1`
- **Description**: Retrieves a task by its ID.
- Response Body:
```json
{
  "message": "Found task",
  "data": {
    "id": 1,
    "task": "go to swim",
    "details": "go to swim",
    "completed": false,
    "taskCreatedAt": "Timestamp",
    "user": {
      "userId": 1,
      "username": "sandesh",
      "email": "sandesh@gmail.com"
    }
  }
}


```
### 3. Get All Tasks for User
- **Endpoint**: GET- `http://localhost:8080/api/v1/tasks/user/1`
- **Description**: Retrieves all tasks for the specified user.
- Response Body:
```json

[
  {
    "id": 1,
    "task": "go to swim",
    "details": "go to swim",
    "completed": false,
    "taskCreatedAt": "Timestamp",
    "user": {
      "userId": 1,
      "username": "sandesh",
      "email": "sandesh@gmail.com"
    }
  },
  {
    "id": 2,
    "task": "play cricket",
    "details": "play cricket",
    "completed": true,
    "taskCreatedAt": "Timestamp",
    "user": {
      "userId": 1,
      "username": "sandesh",
      "email": "sandesh@gmail.com"
    }
  }
]

```
### 4. Update Task
- **Endpoint**: PUT- `http://localhost:8080/api/v1/tasks/1`
- **Description**: Updates the details of a task.
- Request Body:
```json

{
  "task": "go to swim",
  "details": "go to swim"
}
```
- Response Body:
```json

{
  "message": "Task updated!",
  "data": {
    "id": 1,
    "task": "go to swim in the afternoon",
    "details": "go to swim in the afternoon",
    "completed": false,
    "taskCreatedAt": "Timestamp",
    "user": {
      "userId": 1,
      "username": "sandesh",
      "email": "sandesh@gmail.com"
    }
  }
}

```

### 5. Delete Task
- **Endpoint**: DELETE- `http://localhost:8080/api/v1/tasks/1`
- **Description**: Deletes a task by its ID.
- Response Body:
```json

{
  "message": "Task deleted successfully"
}
