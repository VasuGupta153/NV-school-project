import React from "react";
import {Link, withRouter} from "react-router-dom"
import "./Footer.css";
import {signout} from "../../AuthComponents/helper/authapis"

const AdminFooter = ({history}) => {
    return(
        <div className="footer-container">
            <div className="inner-footer-container">
                <div className="footer-links-wrapper">
                    <ul>
                        <li><Link to="/admin">Home</Link></li>
                        <li><Link to="/admin/admission">Admission</Link></li>
                        <li><Link to="/admin/notices">Notices</Link></li>
                    </ul>
                </div>
                <div className="footer-links-wrapper">
                    <ul>
                        <li><Link to="/admin/staff">Staff</Link></li>
                        <li><Link to="/admin/gallery">Gallery</Link></li>
                        <li><Link to="/admin/contact">Contact</Link></li>
                    </ul>
                </div>
                <div className="footer-links-wrapper">
                    <ul>
                        <li><Link to="/admin/about">About Us</Link></li>
                        <li><Link to="/admin/academic">Academic</Link></li>
                        <li><Link to="#" onClick={() => {signout(() => { history.push("/")})}}>Logout</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default withRouter(AdminFooter);