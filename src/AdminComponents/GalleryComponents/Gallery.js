import React from "react"
import {Link} from "react-router-dom"
import AdminHeader from "../CoreComponents/Header/Header";
import AdminFooter from "../CoreComponents/Footer/Footer"
import "./Gallery.css"
import PhotoAlbums from "./PhotoAlbums/PhotoAlbums";

const AdminGallery = () => {
    return(
        <div>
            <AdminHeader />
            <div className="admin-gallery-heading-container">
                <div  className="admin-gallery-heading">
                    <h2>Gallery</h2>
                </div>
                <div className="gallery-add-btns-container">
                <Link style={{color: "white", textDecoration: "none"}} to="/admin/album/create"><div className="add-album-btn">Create Album</div></Link>
                <Link style={{color: "white", textDecoration: "none"}} to="/admin/photo/create"><div className="add-album-photo-btn">Add Photo</div></Link>
                <Link style={{color: "white", textDecoration: "none"}} to="/admin/video/create"><div className="add-album-video-btn">Add Video</div></Link>
                </div>
            </div>
            <PhotoAlbums />
            <AdminFooter />
        </div> 
    )
}

export default AdminGallery;