import { NavLink } from "react-router-dom";
import { useState } from "react";

function Login({ onLoginUser }) {
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
    onLoginUser({
      email: email,
      password: password,
    });
  }
  return (
      <div className="authorization">
        <h1 className="authorization__title">Log in</h1>
        <form action="POST" onSubmit={handleSubmit} className="authorization__form">
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
            className="authorization__button authorization__button_log-in"
          >
            Log in
          </button>
        </form>
        <p className="authorization__info">
          Not a member yet?{" "}
          <NavLink to="/register" className="authorization__link">
            Sign up here!
          </NavLink>
        </p>
      </div>
  );
}

export default Login;
