import React, { useState } from 'react'
import '../style/LoginForm.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginForm() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8081/login", {
        email,
        password,
      });
      
    localStorage.setItem("token", response.data);
      alert('logged in');
      navigate("/dashboard");

    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
        setError("Invalid credentials");
        }else {
        setError("Server error");
      }
      } else {
        setError("Network error. Check connection.");
      }
    }
  }

  return (
    <>
      <center className='login-page'>
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className='title'>Login Form</h2>
          <div className="d-grid gap-2 input-container">
            <input className='form-control' type="text" placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className='form-control' type="password" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}

          <button className="login-btn">Login</button>
          <p className='form-msg'>if You Don't Have an account <Link to="/register">Register</Link></p>
        </form>
      </center>
    </>
  )
}

export default LoginForm