import React from "react"
import Header from "../../CoreComponents/Header/Header";
import Footer from "../../CoreComponents/Footer/Footer"
import "./Gallery.css"
import PhotoAlbums from "./PhotoAlbums/PhotoAlbums";

const Gallery = () => {
    return(
        <div>
            <Header />
            <div className="gallery-heading-container">
                <div  className="gallery-heading">
                    <h2>Gallery</h2>
                </div>
            </div>
            <PhotoAlbums />
            <Footer />
        </div>
    )
}

export default Gallery;