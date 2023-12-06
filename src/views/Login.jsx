import React, { useState } from "react";
import {login, registerUser} from "../controllers/loginFunctions";
import logo from "/logo_python2.png";
import { Toaster, toast } from "sonner";
import RegisterModal from "../components/RegisterModal";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLogin = () => {
    toast.promise(login(username, password), { loading: "Iniciando sesión" });
  };
  const openRegisterModal = () => {
    setShowRegisterModal(true);
  };
  const handleRegister = (name, username, email, password) => {

    registerUser(name, username, email, password);
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
          <a href="#" onClick={openRegisterModal}>
            Registrarse
          </a>
        </form>
        <RegisterModal
          showModal={showRegisterModal}
          closeModal={() => setShowRegisterModal(false)}
          onRegister={handleRegister}
        />
      </div>
      <Toaster position="top-right" duration={900} theme="dark" richColors />
    </div>
  );
}

export default Login;
