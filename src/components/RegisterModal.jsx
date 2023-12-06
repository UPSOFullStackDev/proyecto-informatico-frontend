// Nuevo componente de modal para el registro
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { BsXLg } from "react-icons/bs";
import {registerUser} from "../controllers/loginFunctions";

const RegisterModal = ({ showModal, closeModal, onRegister }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Modal show={showModal} onHide={closeModal} className="modal-container">
      <Modal.Header closeButton className="modal-header">
        <Modal.Title className="modal-title">Registrarse</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <form className="modal-form">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            placeholder="Ingrese su nombre"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="username">Usuario</label>
          <input
            type="text"
            id="username"
            placeholder="Ingrese su usuario"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            placeholder="Ingrese su correo electrónico"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="Ingrese su contraseña"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button className="myButton" variant="secondary" onClick={closeModal}>
          <BsXLg />
          Cancelar
        </Button>
        <Button
          className="myButton"
          variant="primary"
          onClick={() => {
            registerUser(name, username, email, password);
            closeModal();
          }}
        >
          Registrarse
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterModal;
