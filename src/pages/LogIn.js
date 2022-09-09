import React, { useCallback, useContext } from "react";
import { Navigate } from "react-router";
import { useNavigate, Link } from "react-router-dom";
import app from "../firebase-config";
import { AuthContext } from "../Auth";

const LogIn = () => {
  const { currentUser } = useContext(AuthContext);
  let navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      await app.auth().signInWithEmailAndPassword(email.value, password.value);

      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <section className="section">
      <div className="container">
        <form className="search-form" onSubmit={handleLogin}>
          <div className="form-control">
            <label>Email</label>
            <input name="email" type="email" placeholder="Email"></input>

            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
            ></input>
            <div className="btn-container-login">
              <button className="btn">Log in</button>
              <p>Don't have an account?</p>
              <button className="btn" onClick={() => navigate("/signup")}>
                sign up
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LogIn;
