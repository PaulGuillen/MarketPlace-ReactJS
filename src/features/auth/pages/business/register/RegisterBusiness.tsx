import "../../../../../styles/auth/business/RegisterBusiness.css";
import { FaGoogle } from "react-icons/fa";
import tiendaOnline from "../../../../../assets/tienda-online.png";

const RegisterBusiness = () => {
  return (
    <div className="main-container">
      <div className="register-business-container">
        <div className="register-business-left">
          <div className="register-business-graphics">
            <img src={tiendaOnline} alt="Tienda Online" />
          </div>
        </div>
        <div className="register-business-right">
          <div className="register-business-form">
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
              <button type="submit" className="btn-register-business">
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

export default RegisterBusiness;
