import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { loginApi, saveLoggedUser, storeBasicAuth } from "../service/AuthApiService";
import { useNavigate } from "react-router-dom";
import "../css/tasks.css";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  async function handleLoginForm(event) {
    event.preventDefault();

    if (validateForm()) {
      await loginApi(username, password)
        .then((response) => {
          console.log(response.data);
          const basicAuth = "Basic " + btoa(username + ":" + password);
          const role = response.data.role;
          storeBasicAuth(basicAuth);
          saveLoggedUser(response.data.id, username, role);
          navigate(`/tasks`);
        })
        .catch((error) => console.error(error));
    }
  }

  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    if (!username.trim()) {
      errorsCopy.username = "Username required";
      valid = false;
    } else {
      errorsCopy.username = "";
    }

    if (!password.trim()) {
      errorsCopy.password = "Password required";
      valid = false;
    } else {
      errorsCopy.password = "";
    }
    setErrors(errorsCopy);

    return valid;
  }

  return (
    <div className="login-page">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center">
            <img src="/src/assets/loginPage.jpg" alt="Login Page" className="img-fluid" />
          </Col>
          <Col md={6}>
            <div className="login-form bg-light shadow-lg p-4">
              <h2 className="mb-4 text-center">Login</h2>
              <form onSubmit={handleLoginForm}>
                <div className="mb-3">
                  <input
                    type="text"
                    name="username"
                    className={`form-control ${
                      errors.username ? "is-invalid" : ""
                    }`}
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                  {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-dark btn-block">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginComponent;
