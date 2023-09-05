import React, {useState} from "react";
import { Link, withRouter } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Header.css"
import Hamburger from "../Hamburger/Hamburger";
import "../SideDrawer/SideDrawer.css";


const currentTab = (history, path) => {
    if (history.location.pathname === path) {
      return { backgroundColor: "#113979" };
    }
  };
 
const Header = ({history}) => {

    const [collapsed, setCollapsed] = useState(false)
  
    const toggleNavbar = () => {
        setCollapsed(!collapsed);
        console.log(collapsed);
    }
    const open = collapsed ? "open" : "";
    const open1 = collapsed ? "open-cover" : "close-cover";

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
            <div onClick={toggleNavbar} className={`background-cover ${open1}`}
            >
            </div>
            <div className={`side_drawer ${open}`}>
            <div><span onClick={toggleNavbar}><i className="fas fa-times"></i>CLOSE</span></div>
            <ul>
            <li><Link style={currentTab(history, "/")} 
                                className="nav-link" 
                                to="/">Home</Link>
                            </li>
                            <li><Link style={currentTab(history, "/admission")} 
                                className="nav-link" 
                                to="/admission">Admission</Link>
                            </li>
                            <li><Link style={currentTab(history, "/notices")} 
                                className="nav-link" 
                                to="/notices">Notices</Link>
                            </li>
                            <li><Link style={currentTab(history, "/gallery")} 
                                className="nav-link" 
                                to="/gallery">Gallery</Link>
                            </li>
                            <li><Link style={currentTab(history, "/staff")} 
                                className="nav-link" 
                                to="/staff">Staff</Link>
                            </li>
                            <li><Link style={currentTab(history, "/contact")} 
                                className="nav-link" 
                                to="/contact">Contact</Link>
                            </li>
                            <li><Link style={currentTab(history, "/about")} 
                                className="nav-link" 
                                to="/about">About Us</Link>
                            </li>
                            <li><Link style={currentTab(history, "/academic")} 
                                className="nav-link" 
                                to="/academic">Academic</Link>
                            </li>
            </ul>
        </div>
            <header >
                <div className="user-header">
                    <Link to="/"><img src="https://i.imgur.com/iTLnajN.png" alt="Can't Load"></img></Link>
                    <Hamburger clickMe={toggleNavbar}/>
                </div>
                <div className={`user-header1 ${addclass1}`} >
                    <Link to="/"><img src="https://i.imgur.com/iTLnajN.png" alt="Can't Load"></img></Link>
                    <Hamburger clickMe={toggleNavbar}/>
                </div>
                <nav className={addclass}>
                    <div className="nav_container">
                        <ul>
                            <li><Link style={currentTab(history, "/")} 
                                className="nav-link" 
                                to="/">Home</Link>
                            </li>
                            <li><Link style={currentTab(history, "/admission")} 
                                className="nav-link" 
                                to="/admission">Admission</Link>
                            </li>
                            <li><Link style={currentTab(history, "/notices")} 
                                className="nav-link" 
                                to="/notices">Notices</Link>
                            </li>
                            <li><Link style={currentTab(history, "/gallery")} 
                                className="nav-link" 
                                to="/gallery">Gallery</Link>
                            </li>
                            <li><Link style={currentTab(history, "/staff")} 
                                className="nav-link" 
                                to="/staff">Staff</Link>
                            </li>
                            <li><Link style={currentTab(history, "/contact")} 
                                className="nav-link" 
                                to="/contact">Contact</Link>
                            </li>
                            <li><Link style={currentTab(history, "/about")} 
                                className="nav-link" 
                                to="/about">About Us</Link>
                            </li>
                            <li><Link style={currentTab(history, "/academic")} 
                                className="nav-link" 
                                to="/academic">Academic</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        </div> 
    )
}

export default withRouter(Header);