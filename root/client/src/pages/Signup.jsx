import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Globe from "./Globe.jsx"
import "./Login.css"

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
    password_confirm: ""
  });
  const { username, password, password_confirm } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      if(inputValue.password !== inputValue.password_confirm) {
        handleError("Passwords do not match");
      }
      else{
        try {
          const { data } = await axios.post(
            "http://localhost:4000/signup",
            {
              ...inputValue,
            },
            { withCredentials: true }
          );
          const { success, message } = data;
          if (success) {
            handleSuccess(message);
            setTimeout(() => {
              navigate("/");
            }, 1000);
          } else {
            handleError(message);
          }
        } catch (error) {
          console.log(error);
      }
    
      }
      
      setInputValue({
        ...inputValue,
        password: "",
        password_confirm: "",
        username: "",
      });
    };
  

  return (
    <div className="login-container">
      <div className="header-container">
        <img src="/favicon.png" alt="Logo" className="top-left-logo" />
        <div className="globe-title">
          <h1 className="main-title">OuiVisit</h1>
          <br></br>
          <p>Keep track of your adventures around the globe!</p>
          <br></br>
          <p>Join for free now.</p>
        </div>
      </div>
      <div className="content-container">
        <div className="globe-container">
          <Globe></Globe>
        </div>
        <div className="form_container">
        <img src="/favicon.png" alt="Logo" className="form-logo" />
          <h2>Signup</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={username}
                placeholder="Enter your username"
                onChange={handleOnChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={handleOnChange}
              />
            </div>
            <div>
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                name="password_confirm"
                value={password_confirm}
                placeholder="Reenter your password"
                onChange={handleOnChange}
              />
            </div>
            <button type="submit">Submit</button>
            <span>
              Already have an account yet? <Link to={"/login"}>Login</Link>
            </span>
          </form>
          <ToastContainer />
        </div>
      </div>
      </div>
  );
};

export default Signup;