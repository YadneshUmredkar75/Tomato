
import React, { useState, useContext, useEffect } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

function LoginPopup({ setShowLogin }) {
  const { url, setToken } = useContext(StoreContext);
  const [currstate, setCurrstate] = useState("Login");

  // ✅ Reset state on popup open
  const [data, setData] = useState({ name: "", email: "", password: "" });

  // ✅ Reset input fields when the popup opens
  useEffect(() => {
    setData({ name: "", email: "", password: "" });
  }, [setShowLogin]);

  // ✅ Handle input change
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // ✅ Handle form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    let newUrl = currstate === "Login" ? `${url}/api/user/login` : `${url}/api/user/register`;

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.token) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);

        // ✅ Clear input fields after login
        setData({ name: "", email: "", password: "" });

        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  // ✅ Close popup & reset fields
  const handleClose = () => {
    setData({ name: "", email: "", password: "" }); // Reset fields
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
              onChange={onChangeHandler}
              value={data.name} // ✅ Controlled input
              type="text"
              placeholder="Your name"
              name="name"
              required
            />
          )}
          <input
            onChange={onChangeHandler}
            value={data.email} // ✅ Controlled input
            type="email"
            placeholder="Your email"
            name="email"
            required
            autoComplete="off" // ✅ Prevents autofill
          />
          <input
            onChange={onChangeHandler}
            value={data.password} // ✅ Controlled input
            type="password"
            placeholder="Password"
            name="password"
            required
            autoComplete="new-password" // ✅ Prevents browser autofill
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
