import { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import "./css/app.css";
import Header from "./components/Header.jsx";
import useDarkMode from './components/DarkMode.jsx';
import Sidebar from "./components/Sidebar.jsx";
import Home from "./views/Home.jsx";
import Products from "./views/Products.jsx";
import Login from "./views/Login.jsx";
import Clients from "./views/Clients.jsx";
import Bills from "./views/Bills.jsx";
import AddBill from "./views/AddBill.jsx";
import Services from "./views/Services.jsx";
import Settings from "./views/Settings.jsx";
import { token } from "./controllers/localStorage.js";

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, toggleTheme] = useDarkMode();
  const gridContainerRef = useRef(null);

  useEffect(() => {
    // Comprueba si el usuario está autenticado.
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const openSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const closeSidebar = () => {
    setOpenSidebarToggle(false);
  };
  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <Router>
      <div className={`grid-container ${theme === 'dark' ? 'dark-mode' : ''}`} ref={gridContainerRef}>
      <Header OpenSidebar={openSidebar} toggleTheme={toggleTheme} theme={theme} />

        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={openSidebar}
          closeSidebar={closeSidebar}
        />
        <Routes>
          <Route path="/Login"  element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Products" element={<Products />} />
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
