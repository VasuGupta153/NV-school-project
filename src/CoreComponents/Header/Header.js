import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Header.css";
import Hamburger from "../Hamburger/Hamburger";
import "../SideDrawer/SideDrawer.css";

const currentTab = (path) => {
  return { backgroundColor: window.location.pathname === path ? "#113979" : "" };
};

const Header = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
    console.log(collapsed);
  };

  const open = collapsed ? "open" : "";
  const open1 = collapsed ? "open-cover" : "close-cover";

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
      <div onClick={toggleNavbar} className={`background-cover ${open1}`}></div>
      <div className={`side_drawer ${open}`}>
        <div>
          <span onClick={toggleNavbar}>
            <i className="fas fa-times"></i>CLOSE
          </span>
        </div>
        <ul>
          <li>
            <Link style={currentTab("/")} className="nav-link" to="/">
              Home
            </Link>
          </li>
          {/* Other list items */}
        </ul>
      </div>
      <header>
        <div className="user-header">
          <Link to="/">
            <img src={logo} alt="Can't Load" />
          </Link>
          <Hamburger clickMe={toggleNavbar} />
        </div>
        <div className={`user-header1 ${addclass1}`}>
          <Link to="/">
            <img src={logo} alt="Can't Load" />
          </Link>
          <Hamburger clickMe={toggleNavbar} />
        </div>
        <nav className={addclass}>
          <div className="nav_container">
            <ul>
              <li>
                <Link style={currentTab("/")} className="nav-link" to="/">
                  Home
                </Link>
              </li>
              {/* Other list items */}
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
