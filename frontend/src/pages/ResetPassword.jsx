import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { BASE_URL } from './../utils/config';
import '../styles/login.css';

import loginImg from '../assets/images/login.png';
import userIcon from '../assets/images/user.png';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Get location object

  // Set email from navigation state if available
  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'email') setEmail(value);
    else if (id === 'newPassword') setNewPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      window.alert('Please enter your email.');
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const result = await res.json();
      if (res.ok) {
        window.alert('Password has been reset successfully.');
        setTimeout(() => {
          navigate('/login');
        }, 2000); 
      } else {
        window.alert(result.message);
      }
    } catch (err) {
      window.alert('An error occurred. Please try again later.');
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="login" />
              </div>

              <div className="login__form"> 
                <div className="user">
                  <img src={userIcon} alt="user icon" />
                </div>
                <h2>Reset Password</h2>

                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      required
                      id="email"
                      value={email}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Enter your new password"
                      required
                      id="newPassword"
                      value={newPassword}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <Button className="btn secondary__btn auth__btn" type="submit">Reset Password</Button>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ResetPassword;
