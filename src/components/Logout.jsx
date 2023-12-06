import React from "react";
import logout from "../controllers/logoutFunctions.js"
import { BsBoxArrowLeft } from "react-icons/bs";

/**
 * Componente funcional que representa un botón de cierre de sesión.
 * Al hacer clic en el botón, se ejecuta la función de cierre de sesión proporcionada.
 * @returns {JSX.Element} - Elemento JSX que contiene el icono del botón de cierre de sesión.
 */
function Logout() {
  /**
     * Manejador de evento para el clic en el botón de cierre de sesión.
     * Ejecuta la función de cierre de sesión al hacer clic en el botón.
  */
  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <BsBoxArrowLeft
        type="button"
        className="icon header-icon "
        onClick={handleLogout}
      />
    </div>
  );
}

export default Logout;
