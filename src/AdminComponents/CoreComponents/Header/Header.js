import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../images/logo.svg";
import "./Header.css";
import Hamburger from "../Hamburger/Hamburger";
import "../SideDrawer/SideDrawer.css";
import { signout } from "../../AuthComponents/helper/authapis";

const currentTab = (path) => {
  return {
    backgroundColor: window.location.pathname === path ? "#113979" : "",
  };
};

const AdminHeader = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
    console.log(collapsed);
  };

  const handleLogout = () => {
    signout(() => {
      navigate("/");
    });
  };

  const open = collapsed ? "admin-open" : "";
  const open1 = collapsed ? "admin-open-cover" : "admin-close-cover";

  const [addclass, setAddclass] = useState("");
  const [addclass1, setAddclass1] = useState("");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      setAddclass("navbar_fixed");
      setAddclass1("navbar_fixed1");
    } else {
      setAddclass("");
      setAddclass1("");
    }
  });

  return (
    <div>
      <div
        onClick={toggleNavbar}
        className={`admin-background-cover ${open1}`}
      ></div>
      <div className={`admin-side_drawer ${open}`}>
        <div>
          <span onClick={toggleNavbar}>
            <i className="fas fa-times"></i>CLOSE
          </span>
        </div>
        <ul>
          <li>
            <Link
              style={currentTab("/admin")}
              className="nav-link"
              to="/admin"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              style={currentTab("/admin/admission")}
              className="nav-link"
              to="/admin/admission"
            >
              Admission
            </Link>
          </li>
          {/* Other list items */}
          <li>
            <Link onClick={handleLogout} className="nav-link" to="">
              Logout
            </Link>
          </li>
        </ul>
      </div>
      <header>
        <div className="header">
          <Link to="/admin">
            <img src={logo} alt="Can't Load" />
          </Link>
          <Hamburger clickMe={toggleNavbar} />
        </div>
        <div className={`header1 ${addclass1}`}>
          <Link to="/admin">
            <img src={logo} alt="Can't Load" />
          </Link>
          <Hamburger clickMe={toggleNavbar} />
        </div>
        <nav className={addclass}>
          <div className="nav_container">
            <ul>
              {/* Nav links */}
              <li>
                <Link onClick={handleLogout} className="nav-link" to="">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default AdminHeader;
