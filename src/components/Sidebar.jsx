import React from "react";
import Logout from "./Logout.jsx";
import { useState, useEffect } from "react";
import { Link, useLocation} from "react-router-dom";
import {
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsPeopleFill,
  BsFillGearFill,
  BsFillBackspaceFill,
  BsRss,
  BsPass,
} from "react-icons/bs";

/**
 * Datos que representan los elementos de la barra lateral.
 * Cada elemento tiene un identificador (id), un icono, un texto y un enlace a una ruta específica.
 * El último elemento representa el botón de cierre de sesión.
 * @typedef {Object} SidebarItem
 * @property {number} id - Identificador único del elemento.
 * @property {JSX.Element} icon - Icono asociado al elemento.
 * @property {string} text - Texto descriptivo del elemento.
 * @property {string} link - Ruta a la que enlaza el elemento.
 */
const sidebarData = [
  { id: 1, icon: <BsGrid1X2Fill />, text: "Panel", link: "/Home" },
  { id: 2, icon: <BsPeopleFill />, text: "Clientes", link: "/Clients" },
  { id: 3, icon: <BsPass />, text: "Facturas", link: "/Bills" },
  { id: 8, icon: <BsPass />, text: "Generar Factura", link: "/AddBill" },
  { id: 4, icon: <BsFillArchiveFill />,text: "Productos",link: "/Products",},
  { id: 5, icon: <BsRss />,text: "Servicios",link: "/Services",},
  { id: 6, icon: <BsFillGearFill />,text: "Configuración",link: "/Settings",},
  { id: 7, icon: <Logout/>}
];

/**
 * Componente funcional que representa la barra lateral de la aplicación.
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.openSidebarToggle - Indica si la barra lateral está abierta.
 * @param {Function} props.openSidebar - Función para abrir la barra lateral.
 * @param {Function} props.closeSidebar - Función para cerrar la barra lateral.
 * @returns {JSX.Element} - Elemento JSX que representa la barra lateral.
 */
function Sidebar({ openSidebarToggle, closeSidebar }) {

  const location = useLocation();
  const [activeItem, setActiveItem] = useState(0);
  
  /**
     * Manejador de clics en los elementos de la barra lateral.
     * Actualiza el estado del elemento activo, guarda el estado en el almacenamiento local
     * y cierra la barra lateral.
     * @param {number} id - Identificador del elemento clicado.
  */
  const handleItemClick = (id) => {
    setActiveItem(id);
    localStorage.setItem("activeItem", id);
    // Cerramos el sidebar después de hacer clic en un elemento
    closeSidebar();
  };

  /**
   * Efecto secundario que se ejecuta al cargar la página o al cambiar la ubicación.
   * Recupera el elemento activo guardado en el almacenamiento local y lo compara con
   * las rutas de los elementos de la barra lateral para establecer el estado activo.
  */
  useEffect(() => {
    const savedActiveItem = localStorage.getItem("activeItem");
    if (savedActiveItem) {
      setActiveItem(Number(savedActiveItem));
    }
    // Comparamos la ubicación actual con las rutas de los elementos de la barra lateral y establecer el estado activo en consecuencia
    sidebarData.forEach((item) => {
      if (item.link === location.pathname) {
        setActiveItem(item.id);
      }
    });
  }, [location]);

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <span className="icon close_icon" onClick={closeSidebar}>
          <BsFillBackspaceFill className="icon" />
        </span>
      </div>

      <ul className="sidebar-list">
        {sidebarData.map((item) => (
          <li
            key={item.id}
            className={`sidebar-list-item ${
              activeItem === item.id ? "active" : ""
            }`}
            
          >
            <Link to={item.link} onClick={() => handleItemClick(item.id)}>
              {item.icon} {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
