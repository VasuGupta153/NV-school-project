import React from "react";
import AdminHeader from "../CoreComponents/Header/Header";
import {Link} from "react-router-dom"
import "./Home.css";
import Slideshow from "./ImageSlider/ImageSlider";
import LetsGetInspired from "./LetsGetInspired/LetsGetInspired";
import NoticeBoard from "./NoticeBoard/NoticesBoard";
import Principal from "./Principal/Principal";
import FooterImageSlider from "./FooterImageSlider/FooterImageSlider";
import AdminFooter from "../CoreComponents/Footer/Footer";

const AdminHome = () => {
    return(
        <div>
            <AdminHeader />
            <Slideshow />
            <div className="manage-quotes-and-manage-notices-container">
                <Link to="/admin/manageletsgetinspired" style={{color: "white", textDecoration: "none"}}><div className="manage-quotes-btn">Manage Quotes</div></Link>
                <Link to="/admin/notices" style={{color: "white", textDecoration: "none"}}><div className="manage-notices-btn">Manage Notices</div></Link>
            </div>
            <div className="admin-quote-notice-container">
                <LetsGetInspired />
                <NoticeBoard />
            </div>
            <Principal />
            <FooterImageSlider />
            <AdminFooter />
        </div>
    )
}

export default AdminHome;