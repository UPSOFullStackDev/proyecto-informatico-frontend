import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./css/app.css";
import Header from "./views/Header";
import Sidebar from "./views/Sidebar.jsx";
import Home from "./views/Home.jsx";
import Products from "./views/Products.jsx";
import Login from "./views/Login.jsx";
import Clients from "./views/Clients.jsx";
import Bills from "./views/Bills.jsx";
import AddBill from "./views/AddBill.jsx";
import Services from "./views/Services.jsx";
import Settings from "./views/Settings.jsx";

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Comprueba si el usuario está autenticado.
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      localStorage.setItem("token", "");
      localStorage.clear();
    }
  }, []);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <Router>
      <div className="grid-container">
        <Header OpenSidebar={OpenSidebar} />

        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Clients" element={<Clients />} />
          <Route path="/Bills" element={<Bills />} />
          <Route path="/AddBill" element={<AddBill />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/Settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
