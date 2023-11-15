import React, { useState, useEffect } from "react";
import login from "../controllers/loginFunctions"
import "../css/login.css";
import logo from "/logo_python2.png";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    login(username, password);
  };

  return (
    <div className="main-container-login">
      <div className="login-box">
        <img src={logo} className="avatar" alt="Avatar Image" />
        <h1>Sistema de facturación</h1>
        <form id="form-login">
          <label htmlFor="username">Usuario</label>
          <input
            type="email"
            id="username"
            placeholder="Ingresar su Email"
            autoComplete="off"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="Ingresar Contraseña"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="button" onClick={handleLogin} value="Iniciar Sesión" />
          <a href="#">Olvido su contraseña?</a>
          <br />
          <a href="/Register">Registrarse</a>
        </form>
      </div>
    </div>
  );
}

export default Login;
