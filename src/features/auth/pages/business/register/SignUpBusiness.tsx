import React from "react";
import "../../../../../styles/auth/business/SignUpBusiness.css";
import { FaGoogle } from "react-icons/fa";
import tiendaOnline from "../../../../../assets/tienda-online.png";

const SignUpBusiness = () => {
  return (
    <div className="main-container">
      <div className="login-container">
        <div className="login-left">
          <div className="login-graphics">
          <img src={tiendaOnline} alt="Tienda Online" />
          </div>
        </div>
        <div className="login-right">
          <div className="login-form">
            <h2>Welcome back!</h2>
            <p>Please enter your details</p>
            <form>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Enter your email" required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="Enter your password" required />
              </div>
              <div className="form-options">
                <label>
                  <input type="checkbox" /> Remember for 30 days
                </label>
                <a href="#forgot-password">Forgot password?</a>
              </div>
              <button type="submit" className="btn-login">
                Log In
              </button>
              <button className="btn-google">
                <FaGoogle /> Log in with Google
              </button>
            </form>
            <p className="signup-prompt">
              Don’t have an account? <a href="#sign-up">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpBusiness;
