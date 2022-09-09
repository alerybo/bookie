import React from "react";
import { useNavigate } from "react-router-dom";
import app from "../firebase-config";
import {createUserDocument} from '../firebase-config'

const SignUp = () => {
  let navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      const { user } = await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
        console.log(user.email)
      createUserDocument(user)
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <section className="section">
      <div className="container">
        <form className="search-form" onSubmit={handleSignUp}>
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
              <button className="btn">sign up</button>
              <p>Already have an account?</p>
              <button className="btn" onClick={() => navigate("/login")}>
                log in
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
