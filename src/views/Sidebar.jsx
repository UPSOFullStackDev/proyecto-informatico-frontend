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
  BsBoxArrowLeft,
  BsRss,
  BsPass,
} from "react-icons/bs";

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

function Sidebar({ openSidebarToggle, OpenSidebar }) {

  const location = useLocation();
  const [activeItem, setActiveItem] = useState(0);

  const handleItemClick = (id) => {
    setActiveItem(id);
    localStorage.setItem("activeItem", id);
  };

  // Recupera el estado seleccionado del almacenamiento local al cargar la pag
  useEffect(() => {
    const savedActiveItem = localStorage.getItem("activeItem");
    if (savedActiveItem) {
      setActiveItem(Number(savedActiveItem));
    }
    // Comparar la ubicación actual con las rutas de los elementos de la barra lateral y establecer el estado activo en consecuencia
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
        <span className="icon close_icon" onClick={OpenSidebar}>
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
