import React from "react";
import logout from "../controllers/logoutFunctions.js"
import { BsBoxArrowLeft } from "react-icons/bs";
function Logout() {
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
