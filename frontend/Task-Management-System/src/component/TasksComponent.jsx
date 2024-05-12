import React, { useEffect, useState } from "react";
import { deleteTask, markDone, markPending, retrieveAllTasks } from "../service/TaskApiService";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaTrash, FaPen, FaEye } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../css/tasks.css";

const TasksComponent = ({ userId }) => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, [userId]);

  const fetchTasks = () => {
    retrieveAllTasks(userId)
      .then((response) => setTasks(response.data))
      .catch((error) => console.log(error));
  };

  const updateTask = (id) => {
    navigate(`/update-task/${id}`);
  };

  const deleteTaskFun = (id) => {
    deleteTask(id)
      .then(() => {
        fetchTasks();
        toast.success("Task deleted successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to delete task");
      });
  };

  const markTask = (id, isChecked) => {
    if (isChecked) {
      markDone(id)
        .then(() => {
          fetchTasks();
          toast.success("Task marked as completed");
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to mark task as completed");
        });
    } else {
      markPending(id)
        .then(() => {
          fetchTasks();
          toast.success("Task marked as pending");
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to mark task as pending");
        });
    }
  };

  const viewTaskDetails = (task) => {
    navigate(`/task-details/${task.id}`, { state: task });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="m-0">Task List</h2>
                <Link to="/add-task" className="btn btn-primary btn-sm">
                  <FaPlus className="me-2" /> Add Task
                </Link>
              </div>
              {tasks.map(
                (task) =>
                  !task.completed && (
                    <div key={task.id} className="mb-4">
                      <div className="card">
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
                              {task.updatedAt
                                ? `Updated: ${new Date(
                                    task.updatedAt
                                  ).toLocaleString()}`
                                : `Created: ${new Date(
                                    task.taskCreatedAt
                                  ).toLocaleString()}`}
                            </small>
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

export default TasksComponent;
