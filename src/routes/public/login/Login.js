import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../../redux/slices/authSlice";

const LoginPage = styled.div`
  background: #212121;
  width: 100%;
  height: 100vh;
  display: flex;
  gap: 20%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background: #4c4c4c;
  box-shadow: 15px 15px 30px rgb(25, 25, 25),
             -15px -15px 30px rgb(25, 25, 25);
  border-radius: 30px;
  box-sizing: border-box;

  @media (max-width: 500px) {
    padding: 20px;
    gap: 12px;
  }
`;

const Title = styled.h1`
  color: #f3f4f6;
  font-size: 1.8rem;
  margin: 0;
`;

const Header = styled.h1`
  color: #f3f4f6;
  font-size: 1.8rem;
  margin: 0;
  position: fixed;
  top: 100px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #3a3b3c;
  border-radius: 4px;
  background-color: #1f1f1f;
  color: #e5e7eb;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s;
  box-sizing: border-box;
  &:focus {
    border-color: #3b82f6;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #3b82f6;
  color: #ffffff;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2563eb;
  }
`;

const ChangePage = styled.p`
  color: #9ca3af;
  font-size: 0.9rem;
  text-align: center;
  cursor: pointer;
  transition: color 0.3s;
  box-sizing: border-box;

  &:hover {
    color: #3b82f6;
  }
`;

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginMode, setLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const error = useSelector((state) => state.auth.error);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    dispatch(loginUser({ name: formData.name, password: formData.password }))
      .unwrap()
      .then(() => navigate("/dashboard"))
      .catch((error) => console.error("Login fehlgeschlagen:", error));
  };

  const handleRegister = () => {
    if (formData.password !== formData.confirmPassword) {
      console.error("Passwörter stimmen nicht überein.");
      return;
    }
    dispatch(registerUser({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    }))
      .unwrap()
      .then(() => setLoginMode(true))
      .catch((error) => console.error("Registrierung fehlgeschlagen:", error));
  };

  return (
    <LoginPage>
      <Header>TaskSmart</Header>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loginMode ? (
        <FormContainer>
          <Title>Login</Title>
          <Input name="name" placeholder="Username" value={formData.name} onChange={handleChange} />
          <Input name="password" placeholder="Password" type="password" value={formData.password} onChange={handleChange} />
          <Button onClick={handleLogin}>Sign In</Button>
          
          <ChangePage onClick={() => setLoginMode(false)}>
            Don't have an account?
          </ChangePage>
        </FormContainer>
      ) : (
        <FormContainer>
          <Title>Register</Title>
          <Input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} />
          <Input name="name" placeholder="Username" value={formData.name} onChange={handleChange} />
          <Input name="password" placeholder="Password" type="password" value={formData.password} onChange={handleChange} />
          <Input name="confirmPassword" placeholder="Confirm Password" type="password" value={formData.confirmPassword} onChange={handleChange} />
          <Button onClick={handleRegister}>Register</Button>
          <ChangePage onClick={() => setLoginMode(true)}>
            Already have an account?
          </ChangePage>
        </FormContainer>
      )}
    </LoginPage>
  );
}

export default Login;