import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./SigninPage.css";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Initialize navigate

  const handleSignin = (e) => {
    e.preventDefault(); // Prevents the form from refreshing the page

    // Check if fields are empty
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    // Validate password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    // Mock authentication logic (replace with your real API call)
    console.log("Email:", email);
    console.log("Password:", password);

    // Simulate a successful sign-in
    alert("Signin successful!");
    navigate("/Section1"); // Navigate to the Section1 page
  };

  return (
    <div className="signin-container">
      <div className="signin-form">
        <h2>Signin</h2>
        <form onSubmit={handleSignin}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="signin-button">
            Signin
          </button>
        </form>
        <p>
          Don't have an account? <a href="/signup">Signup</a>
        </p>
      </div>
    </div>
  );
};

export default SigninPage;
