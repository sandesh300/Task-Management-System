import { useEffect, useState } from "react";
import {
  deleteTask,
  markDone,
  markPending,
  retrieveAllTasks,
} from "../service/TaskApiService";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaPen, FaEye, FaCheck, FaTimes } from "react-icons/fa";
import "../css/tasks.css";

const TaskHistory = ({ userId }) => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    allTasks(userId);
  }, [userId]);

  function allTasks(userId) {
    retrieveAllTasks(userId)
      .then((response) => setTasks(response.data))
      .catch((error) => console.log(error));
  }

  const viewTaskDetails = (task) => {
    navigate(`/task-details/${task.id}`, { state: task });
  };


  function updateTask(id) {
    navigate(`/update-task/${id}`);
  }

  function deleteTaskFun(id) {
    deleteTask(id)
      .then(() => allTasks(userId))
      .catch((error) => console.log(error));
  }

  function markTask(id, isChecked) {
    if (isChecked) {
      markDone(id)
        .then((response) => {
          console.log(response.data.id);
          allTasks(userId);
        })
        .catch((error) => console.error(error));
    } else {
      markPending(id)
        .then((response) => {
          console.log(response.data);
          allTasks(userId);
        })
        .catch((error) => console.error(error));
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="m-0">Task History</h2>
                <Link to="/add-task" className="btn btn-primary btn-sm">
                  <i className="fas fa-plus me-2"></i> Add Task
                </Link>
              </div>
              {tasks.map(
                (task) =>
                  task.completed && (
                    <div key={task.id} className="card mb-4">
                      <div className="card-body">
                        <div className="d-flex justify-content-end gap-2 mb-2">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => viewTaskDetails(task)}
                          >
                            <FaEye />
                          </button>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => updateTask(task.id)}
                          >
                            <FaPen />
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => deleteTaskFun(task.id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              checked={task.completed}
                              onChange={(e) =>
                                markTask(task.id, e.target.checked)
                              }
                              type="checkbox"
                            />
                          </div>
                          <div
                            className={`${
                              task.completed
                                ? "text-decoration-line-through text-muted"
                                : ""
                            }`}
                          >
                            <strong>{task.task}</strong>
                          </div>
                        </div>
                        <div className="mt-2">
                          <small className="text-muted">
                            Created: {task.taskCreatedAt}
                          </small>
                          <div>
                            {task.completed ? (
                              <FaCheck className="text-success" />
                            ) : (
                              <FaTimes className="text-danger" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskHistory;
