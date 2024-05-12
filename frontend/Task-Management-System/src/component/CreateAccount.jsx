import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { registerApi } from "../service/AuthApiService";
import { useNavigate } from "react-router-dom";
import "../css/tasks.css";


const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleRegistrationForm(event) {
    event.preventDefault();

    if (validateForm()) {
      const register = { username, email, password };

      registerApi(register)
        .then((response) => {
          console.log(response.data);
          navigate("/login");
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

    if (!email.trim()) {
      errorsCopy.email = "Email required";
      valid = false;
    } else if (!isValidEmail(email)) {
      errorsCopy.email = "Invalid email address";
      valid = false;
    } else {
      errorsCopy.email = "";
    }

    if (!password.trim()) {
      errorsCopy.password = "Password required";
      valid = false;
    } else if (!isValidPassword(password)) {
      errorsCopy.password = "Password must be at least 6 characters long";
      valid = false;
    } else {
      errorsCopy.password = "";
    }

    setErrors(errorsCopy);

    return valid;
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPassword(password) {
    return password.length >= 6;
  }

  return (
    <div className="signup-page">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center">
            <img
              src="/src/assets/loginPage.jpg"
              alt="Login Page"
              className="img-fluid"
            />
          </Col>
          <Col md={6}>
            <div className="signup-form shadow-lg p-5 rounded-3">
              <h2 className="mb-4 text-center">Create Account</h2>
              <form onSubmit={handleRegistrationForm}>
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
                    type="text"
                    name="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
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
                  <button
                    type="submit"
                    className="btn btn-dark btn-block"
                  >
                    Create
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

export default CreateAccount;
