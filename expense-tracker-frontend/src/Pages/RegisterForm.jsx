import React, { useState } from 'react'
import '../style/Register.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function RegisterForm() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are reuired");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8081/register", {
        name,
        email,
        password,
      });
      localStorage.setItem("user", JSON.stringify(response.data));

      alert('Registration successful!');
      navigate("/login");

    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          setError("Invalid email or password");
        } else if (err.response.status === 500) {
          setError("Server error. Try again later.");
        } else {
          setError("Something went wrong");
        }
      } else {
        setError("Server not responding");
      }
    }
  }

  return (
    <>
      <center className='register-page'>
        <form className="register-form" onSubmit={handleSubmit}>
          <h2 className='title'>Register Form</h2>
          <div className="d-grid gap-2 input-container ">
            <input className='form-control' type="text" placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} />
            <input className='form-control' type="email" placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className='form-control' type="password" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button className="reg-btn">Submit</button>
        </form>
      </center>
    </>
  )
}

export default RegisterForm