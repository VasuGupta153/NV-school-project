import React, {useState} from "react";
import { Link, withRouter } from "react-router-dom";
import logo from "../../../images/logo.svg";
import "./Header.css"
import Hamburger from "../Hamburger/Hamburger";
import "../SideDrawer/SideDrawer.css";
import {signout} from "../../AuthComponents/helper/authapis"

const currentTab = (history, path) => {
    if (history.location.pathname === path) {
      return { backgroundColor: "#113979" };
    }
  };
 
const AdminHeader = ({history}) => {

    const [collapsed, setCollapsed] = useState(false)
  
    const toggleNavbar = () => {
        setCollapsed(!collapsed);
        console.log(collapsed);
    }
    const open = collapsed ? "admin-open" : "";
    const open1 = collapsed ? "admin-open-cover" : "admin-close-cover";

    // To fix Navbar-------------------------------
    const [addclass, setAddclass] = useState("")
    const [addclass1, setAddclass1] = useState("")

    window.addEventListener("scroll", ()=> {
        if(window.scrollY > 100){
            setAddclass("navbar_fixed")
            setAddclass1("navbar_fixed1")
        }else{
            setAddclass("")
            setAddclass1("")
        }
    })

    return(
        <div>
            <div onClick={toggleNavbar} className={`admin-background-cover ${open1}`}
            >
            </div>
            <div className={`admin-side_drawer ${open}`}>
            <div><span onClick={toggleNavbar}><i className="fas fa-times"></i>CLOSE</span></div>
            <ul>
            <li><Link style={currentTab(history, "/")} 
                                className="nav-link" 
                                to="/admin">Home</Link>
                            </li>
                            <li><Link style={currentTab(history, "/admin/admission")} 
                                className="nav-link" 
                                to="/admin/admission">Admission</Link>
                            </li>
                            <li><Link style={currentTab(history, "/admin/notices")} 
                                className="nav-link" 
                                to="/admin/notices">Notices</Link>
                            </li>
                            <li><Link style={currentTab(history, "/admin/gallery")} 
                                className="nav-link" 
                                to="/admin/gallery">Gallery</Link>
                            </li>
                            <li><Link style={currentTab(history, "/admin/staff")} 
                                className="nav-link" 
                                to="/admin/staff">Staff</Link>
                            </li>
                            <li><Link style={currentTab(history, "/admin/contact")} 
                                className="nav-link" 
                                to="/admin/contact">Contact</Link>
                            </li>
                            <li><Link style={currentTab(history, "/admin/about")} 
                                className="nav-link" 
                                to="/admin/about">About Us</Link>
                            </li>
                            <li><Link style={currentTab(history, "/admin/academic")} 
                                className="nav-link" 
                                to="/admin/academic">Academic</Link>
                            </li>
                            <li><Link to="" onClick={() => {signout(() => {history.push("/")})}} 
                                className="nav-link">Logout</Link>
                            </li>
            </ul>
        </div>
            <header >
                <div className="header" >
                    <Link to="/admin"><img src="https://i.imgur.com/iTLnajN.png" alt="Can't Load"></img></Link>
                    <Hamburger clickMe={toggleNavbar}/>
                </div>
                <div className={`header1 ${addclass1}`} >
                    <Link to="/admin"><img src="https://i.imgur.com/iTLnajN.png" alt="Can't Load"></img></Link>
                    <Hamburger clickMe={toggleNavbar}/>
                </div> 
                <nav className={addclass}>
                    <div className="nav_container">
                        <ul>
                            <li><Link style={currentTab(history, "/admin")} 
                                className="nav-link" 
                                to="/admin">Home</Link>
                            </li>
                            <li><Link style={currentTab(history, "/admin/admission")} 
                                className="nav-link" 
                                to="/admin/admission">Admission</Link>
                            </li>
                            <li><Link style={currentTab(history, "/admin/notices")} 
                                className="nav-link" 
                                to="/admin/notices">Notices</Link>
                            </li>
                            <li><Link style={currentTab(history, "/admin/gallery")} 
                                className="nav-link" 
                                to="/admin/gallery">Gallery</Link>
                            </li>
                            <li><Link style={currentTab(history, "/admin/staff")} 
                                className="nav-link" 
                                to="/admin/staff">Staff</Link>
                            </li>
                            <li><Link style={currentTab(history, "/admin/contact")} 
                                className="nav-link" 
                                to="/admin/contact">Contact</Link>
                            </li>
                            <li><Link style={currentTab(history, "/admin/about")} 
                                className="nav-link" 
                                to="/admin/about">About Us</Link>
                            </li>
                            <li><Link style={currentTab(history, "/admin/academic")} 
                                className="nav-link" 
                                to="/admin/academic">Academic</Link>
                            </li>
                            
                        </ul>
                    </div>
                </nav>
            </header>
        </div> 
    )
}

export default withRouter(AdminHeader);
