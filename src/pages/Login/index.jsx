import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUserSession } from '../../utils/common';
import axios from 'axios';
import "./style.css";
import { SHA256 } from 'crypto-js';

const Login = props => {
  const navigate = useNavigate();
const [formErrors, setFormErrors] = useState({});
const [isSubmit, setIsSubmit] = useState(false);

  const [formValues, setFormValues] = useState({ email: 'test45@yopmail.com', password: 'Test@123' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
};

const handleLogin = (e) => {
  e.preventDefault();
  setError(null);
  setFormErrors(validate(formValues));
  setLoading(true);

  const formData = new FormData();
  formData.append('username', formValues.email);
  formData.append('password', formValues.password);
  formData.append('grant_type', 'password');

  const headers = {
    'Authorization': 'Basic UHJvbWlsbzpxNCE1NkBaeSN4MiRHQg==',
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  axios.post('https://apiv2stg.promilo.com/user/oauth/token', formData,{headers})
    .then(response => {
      setLoading(false);
      setUserSession(response.data.access_token, response.data.user);
    })
    .catch(error => {
      setLoading(false);
      if (error.response && error.response.status === 401) {
        setError('Invalid credentials. Please check your email and password.');
      } else {
        setError('Something went wrong. Please try again later.');
      }
    });
};

useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const hashedPassword = SHA256(formValues.password).toString();
    
    }
}, [formErrors, formValues, isSubmit]);
const validate = (values) => {
    const errors = {};
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
   const regex1=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!values.email) {
        errors.email = "Email is required!";
    } else if (!regex1.test(values.email)) {
        errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
        errors.password = "Password is required";
    } else if (!regex.test(values.password)) {
        errors.password = "Password must be 8 characters";
    }
   
   
    return errors;
    };
    
    const redirect = () => {
      navigate("/products/");
    };
  return (
    <>
    <div className="bgImg"></div>
    <div className="container">
        {Object.keys(formErrors).length === 0 && isSubmit ? (
            <div className="ui message success">
                Signed in successfully
            </div>
        ) : (
            console.log("Entered Details", formValues)
        )}

        <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <div className="ui divider"></div>
            <div className="ui form">
               
                <div className="field">
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={formValues.email}
                        onChange={handleChange}
                    />
                </div>
                <p>{formErrors.email}</p>
                <div className="field">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formValues.password}
                        onChange={handleChange}
                    />
                </div>
                <p>{formErrors.password}</p>
                
                <button className="fluid ui button blue" onClick={() => redirect()}>Login</button>
            </div>
        </form>
        
    </div>{" "}
</>
);
}
export default Login;