import React from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../css/tasks.css';

const DetailPage = () => {
    const { state } = useLocation();
    const { id } = useParams();
    const task = state || { id };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-lg">
                        <div className="card-body detail-card">
                            <div className="row mb-4">
                                <div className="col-auto">
                                    <Link to="/tasks" className="btn btn-outline-secondary btn-sm">
                                        <FaArrowLeft className="me-2" />
                                        Back to Tasks
                                    </Link>
                                </div>
                            </div>
                            <div className="text-center mb-4">
                                <h3>Task Details</h3>
                            </div>
                            <div className="mb-3">
                                <h5 className="m-0">Task:</h5>
                                <p className="m-0">{task.task}</p>
                            </div>
                            <div className="mb-3">
                                <h5 className="m-0">Status:</h5>
                                <p className={`m-0 ${task.completed ? 'text-success' : 'text-warning'}`}>
                                    {task.completed ? 'Completed' : 'Pending'}
                                </p>
                            </div>
                            <div>
                                <h5 className="m-0">Created At:</h5>
                                <p className="m-0">{task.taskCreatedAt}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailPage;
