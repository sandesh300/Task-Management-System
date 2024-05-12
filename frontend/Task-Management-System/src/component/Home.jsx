import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/HomePage.css';

const HomePage = () => {
    return (
      <div className="center-in-page">
      
        <Container>
          <Row className="justify-content-center align-items-center text-center">
            <Col lg={8}>
              <h1 className="display-4">Welcome to <span className="text-primary">Task Management Web Application</span></h1>
              <p className="lead mb-4">
                Experience a smarter way to manage tasks. Boost productivity, collaborate seamlessly, and accomplish more in less time.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };

export default HomePage;
