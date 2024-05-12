import { useEffect, useState } from "react";
import { createTask, retrieveTaskById, updateTask } from "../service/TaskApiService";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FaTasks } from "react-icons/fa";

const AddTaskComponent = ({ userId }) => {
    const [task, setTask] = useState("");
    const [completed, setCompleted] = useState(false);
    const taskCreatedAt = new Date().toISOString(); // Convert to ISO string
    const { id } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({ task: "" });
  
    useEffect(() => {
      if (id) {
        retrieveTaskById(id)
          .then((response) => {
            console.log(response.data.object);
            setTask(response.data.object.task);
            setCompleted(response.data.object.completed);
          })
          .catch((error) => console.log(error));
      }
    }, [id]);
  
    function saveTask(event) {
      event.preventDefault();
      if (validateForm()) {
        const taskObj = {
          task,
          completed,
          taskCreatedAt,
          updatedAt: new Date().toISOString(), // Add updatedAt field
        };
        if (id) {
          updateTask(taskObj, id)
            .then(navigate("/tasks"))
            .catch((error) => console.error(error));
        } else {
          createTask(taskObj, userId)
            .then(navigate("/tasks"))
            .catch((error) => console.error(error));
        }
      }
    }
  

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };
    if (task.trim()) {
      errorsCopy.task = "";
    } else {
      errorsCopy.task = "Task field is required";
      valid = false;
    }
    setErrors(errorsCopy);
    return valid;
  }

  function AddUpdateText() {
    if (id) {
      return "Update";
    } else {
      return "Add";
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Card className="shadow rounded-lg">
              <Card.Body>
                <div className="d-flex align-items-center mb-4">
                  <FaTasks className="mr-3 text-primary" size={32} />
                  <h2 className="m-0">{AddUpdateText()} Task</h2>
                </div>
                <Form onSubmit={saveTask}>
                  <Form.Group controlId="formTask">
                    <Form.Label>Task Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter task description"
                      value={task}
                      onChange={(event) => setTask(event.target.value)}
                      isInvalid={!!errors.task}
                      className="rounded-lg"
                    />
                    <Form.Control.Feedback type="invalid" className="d-block">
                      {errors.task}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="mt-3 w-100 rounded-pill"
                  >
                    {AddUpdateText()} Task
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddTaskComponent;