import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import "./LoginPopUp.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const LoginPopUp = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const { url, setToken } = useContext(StoreContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    console.log(data);
  }, [data]);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const onLogin = async (e) => {
    e.preventDefault();
    if (currState === "Login") {
      try {
        const res = await axios.post(`${url}/api/user/login`, data);
        console.log(res.data);
        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          setToken(res.data.token);
          setShowLogin(false);
        } else {
          alert(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await axios.post(`${url}/api/user/register`, data);
        console.log(res.data);
        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          setToken(res.data.token);
          setShowLogin(false);
        } else {
          alert(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h1>{currState}</h1>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input
              name="name"
              onChange={handleChange}
              value={data.name}
              type="text"
              placeholder="Your Name"
              required
            />
          )}

          <input
            name="email"
            onChange={handleChange}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            onChange={handleChange}
            value={data.password}
            name="password"
            type="password"
            placeholder="Your Password"
            required
          />
          <button type="submit">
            {currState === "Sign Up" ? "Sign Up" : "Log In"}
          </button>
        </div>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By Continuing I agree to the terms of use and Policy. </p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already to have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Click Here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopUp;
