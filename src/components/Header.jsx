import React from "react";
import Logout from "./Logout.jsx";
import { BsSearch, BsJustify } from "react-icons/bs";
import log from "/logo_python2.png";
import { FaSun, FaMoon } from "react-icons/fa";
/**
 * Componente funcional que representa la barra de encabezado de la aplicación.
 * @param {Object} props - Las propiedades pasadas al componente.
 * @param {Function} props.OpenSidebar - Función para abrir la barra lateral.
 * @returns {JSX.Element} - Elemento JSX que representa la barra de encabezado.
 */

function Header({ OpenSidebar, toggleTheme, theme }) {
  return (
    <header className="header">
      <div className="header-title">
        <div className="header-brand">
          <img src={log} alt="" className="logo" />
          UpsoFullStackDev
        </div>
      </div>
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="search-wrapper">
        <input type="search" placeholder="Buscar" />
        <BsSearch className="icon bsearch" />
      </div>

      <div className="theme-switch-wrapper">
        <label className="theme-switch">
          <input
            type="checkbox"
            id="checkbox"
            onChange={toggleTheme}
            checked={theme === "dark"}
          />
          <div className="slider round">
            <FaMoon className="icon moon" />
            <FaSun className="icon sun" />
          </div>
        </label>
      </div>
    </header>
  );
}

export default Header;
