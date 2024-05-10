import { useEffect, useState } from "react"
import { createTask , retrieveTaskById, updateTask } from "../service/TaskApiService"
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom"

const AddTaskComponent = ({ userId }) => {

    const [task, setTask] = useState('')
    const [completed, setCompleted] = useState(false)
    const taskCreatedAt = new Date().toDateString()
    const { id } = useParams()
    const navigate = useNavigate()
    const [errors, setErrors] = useState({
        task: ''
    })

    useEffect(() => {
        if (id) {
            retrieveTaskById(id)
            .then(response => {
                console.log(response.data.object);
                setTask(response.data.object.task);
                    setCompleted(response.data.object.completed)
                })
                .catch(error => console.log(error))
        }
    }, [id])
    
    function saveTask(event) {
        event.preventDefault()

        if (validateForm()) {
            const taskObj = { task, completed, taskCreatedAt }

            if (id) {
                updateTask(taskObj, id)
                    .then(navigate('/tasks'))
                    .catch(error => console.error(error))
            } else {
                createTask(taskObj, userId)
                    .then(navigate('/tasks'))
                    .catch(error => console.error(error))
            }
        }
    }

    function validateForm() {
        let valid = true

        const errorsCopy = { ...errors }

        if (task.trim()) {
            errorsCopy.task = ''
        } else {
            errorsCopy.task = 'task field is required'
            valid = false
        }
        setErrors(errorsCopy)

        return valid
    }

    function AddUpdateText() {
        if (id) {
            return 'Update'
        } else {
            return 'Add'
        }
    }

    return (
        <div className="center-in-page">
            <Container>
                <Row className="justify-content-center align-items-center">
                    <Col lg={4}>
                        <p className="fs-3">{AddUpdateText()} task</p>
                        <form className="bg-light shadow-lg p-4">
                            <div className="form-group mb-2">
                                <textarea
                                    type="text"
                                    placeholder="task"
                                    name="task"
                                    className={`form-control ${errors.task ? 'is-invalid' : ''}`}
                                    value={task}
                                    onChange={(event) => setTask(event.target.value)}
                                />
                                {errors.task && <div className="invalid-feedback">{errors.task}</div>}
                            </div>
                            <button className="btn btn-dark" onClick={(event) => saveTask(event)}>{AddUpdateText()}</button>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AddTaskComponent