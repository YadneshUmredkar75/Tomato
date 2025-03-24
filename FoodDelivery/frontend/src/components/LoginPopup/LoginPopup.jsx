
import React, { useState, useContext } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

function LoginPopup({ setShowLogin }) {
  const { url, setToken } = useContext(StoreContext);
  const [currstate, setCurrstate] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Fix: Use onChange instead of onClickHandler
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Submit form data
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    let newUrl = url;

    if (currstate === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }

      if (response.data.token) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  // Close the login popup
  const handleClose = () => {
    setShowLogin(false);
  };

  return (
    <div className="login-popup">
      <form onSubmit={onSubmitHandler} className="login-popup-container">
        <div className="login-popup-title">
          <h1>{currstate}</h1>
          <img onClick={handleClose} src={assets.cross_icon} alt="Close" />
        </div>

        <div className="login-popup-inputs">
          {currstate !== "Login" && (
            <input
              onChange={onChangeHandler} // Fix applied
              value={data.name}
              type="text"
              placeholder="Your name"
              name="name"
              required
            />
          )}
          <input
            onChange={onChangeHandler} // Fix applied
            value={data.email}
            type="text"
            placeholder="Your email"
            name="email"
            required
          />
          <input
            onChange={onChangeHandler} // Fix applied
            value={data.password}
            type="password"
            placeholder="Password"
            name="password"
            required
          />
        </div>

        <button type="submit" className="login-btn">
          {currstate === "Signup" ? "Create Account" : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>

          {currstate === "Login" ? (
            <p>
              Create a new account?{" "}
              <span onClick={() => setCurrstate("Signup")}>Click here</span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => setCurrstate("Login")}>Login here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default LoginPopup;
