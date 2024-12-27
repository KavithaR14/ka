import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignupPage.css";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle OTP sending
  const handleSendOtp = async (e) => {
    e.preventDefault();
  
    // Check if email is valid
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
  
    setEmailError(""); // Clear any previous error
    try {
      const response = await axios.post("http://localhost:5004/api/users/send-otp", { name, email });
      console.log("Response from server:", response);  // Debugging log
      if (response.data && response.data.message) {
        setIsOtpSent(true);
        alert(response.data.message);
      } else {
        alert("Unexpected response from the server.");
      }
    } catch (error) {
      console.error("Error from backend:", error);  // Debugging log
      alert(error.response?.data?.error || "Failed to send OTP. Please try again later.");
    }
  };

  // Handle the signup process after OTP verification
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setEmailError(""); // Clear any previous error
    try {
      const response = await axios.post("http://localhost:5004/api/users/verify-otp", {
        name,
        email,
        otp: enteredOtp,
      });
      alert(response.data.message);
      navigate("/Signin"); // Navigate to the sign-in page
    } catch (error) {
      alert(error.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-form">
        <h2>Signup</h2>
        <form>
          <div className="input-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="error-message">{emailError}</p>}
            <button
              type="button"
              className="send-otp-button"
              onClick={handleSendOtp}
            >
              Send OTP
            </button>
          </div>
          {isOtpSent && (
            <div className="input-group">
              <label htmlFor="otp">Enter OTP:</label>
              <input
                type="text"
                id="otp"
                placeholder="Enter the OTP sent to your email"
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
              />
            </div>
          )}
          <button
            type="submit"
            className="signin-button"
            onClick={handleSignup}
            disabled={!isOtpSent}
          >
            Signup
          </button>
        </form>
        <p>
          Already have an account? <a href="/signin">Signin</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
