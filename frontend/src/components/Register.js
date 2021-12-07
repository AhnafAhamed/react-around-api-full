import { NavLink } from "react-router-dom";
import { useState } from "react";

function Register({ onRegisterUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onRegisterUser({
      email: email,
      password: password,
    });
  }

  return (
      <div className="authorization">
        <h1 className="authorization__title">Register</h1>
        <form
          action="POST"
          onSubmit={handleSubmit}
          name="register"
          className="authorization__form"
        >
          <input
            placeholder="Email"
            className="authorization__input"
            type="email"
            name="email"
            minLength="2"
            maxLength="200"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <input
            placeholder="Password"
            className="authorization__input"
            type="password"
            name="password"
            minLength="2"
            maxLength="200"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <button
            type="submit"
            className="authorization__button authorization__button_sign-up"
          >
            Sign Up
          </button>
        </form>
        <p className="authorization__info">
          Already a member?{" "}
          <NavLink to="/login" className="authorization__link">
            Log in here!
          </NavLink>
        </p>
      </div>
  );
}

export default Register;
