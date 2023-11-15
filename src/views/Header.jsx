import React from "react";
import Logout from "./Logout.jsx";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
  BsBoxArrowLeft,
} from "react-icons/bs";
import log from '/logo_python2.png'

function Header({ OpenSidebar }) {
  return (
    <header className="header" >
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
      <div type="button" className="header-right" >
        <h4 className="header-logout"></h4>
        <Logout />
      </div>
    </header>
  );
}

export default Header;
