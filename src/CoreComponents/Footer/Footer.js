import React from "react";
import {Link} from "react-router-dom"
import "./Footer.css";

const Footer = () => {
    return(
        <div className="footer-container">
            <div className="inner-footer-container">
                <div className="footer-links-wrapper">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/admission">Admission</Link></li>
                        <li><Link to="/notices">Notices</Link></li>
                    </ul>
                </div>
                <div className="footer-links-wrapper">
                    <ul>
                        <li><Link to="/staff">Staff</Link></li>
                        <li><Link to="/gallery">Gallery</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
                <div className="footer-links-wrapper">
                    <ul>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/academic">Academic</Link></li>
                        <li><Link to="/login">Admin Login</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer;