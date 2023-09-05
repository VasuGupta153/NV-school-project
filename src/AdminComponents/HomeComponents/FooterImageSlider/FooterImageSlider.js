import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom"
import { Slide } from 'react-slideshow-image';
import '../../../../node_modules/react-slideshow-image/dist/styles.css'
import "../ImageSlider/ImageSlider.css"
import "./FooterImageSlider.css"
import {getallFooterPhotos} from "./helper/FooterImageSliderApis" 
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const properties = {
    duration: 4000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true
}
 
const Slideshow = () => {

  const [footerPhotos, setFooterPhotos] = useState([])

    const preloadFooterPhotos = () => {
      setLoader(true)
      getallFooterPhotos().then(data => {
            if(data.error){
              toast.error("Error Occured!")
              setLoader(false)
            } else{
              setFooterPhotos(data)
              setLoader(false)
            }
        })
    }

    useEffect(() => {
      preloadFooterPhotos()
    }, [])

    // loader----------------------------------------------------------
    const [loader, setLoader] = useState(false)
    
    const override = `
    display: block;
    margin: 80px auto;
    text-align: center;
    border-color: red;
    `;

    return (
      <div className="footer-slides-container">
        <ToastContainer 
        hideProgressBar={false}
        newestOnTop={true}
        autoClose={3000}
        position={"top-right"}
        />
        <div className="footer-heading-outer-container">
          <div className="footer-heading-inner-container">
            Gallery
          </div>
          <div className="footer-view-all">
            <Link to="/admin/gallery">View all</Link>
          </div>
        </div>
        <SyncLoader
            css={override}
            loading={loader}
            size={10}
            color="#B80924"
            />
            {!loader &&  <div className="slide-container-footer">
        <Link style={{color: "white", textDecoration: "none"}} to="/admin/managefootersliderphotos"><div className="footer-image-slider-manage-btn">Manage Footer Slider Photos</div></Link>
          <Slide {...properties}>
            {footerPhotos.map((image, index) => {
                return(
                  <div key={index} className="each-slide">
                      <div style={{'backgroundImage': `url(${image.footerphotoURL})`}}></div>
                  </div>
                )
            })}
          </Slide>
          
        </div>}
       
      </div>
    )
}

export default Slideshow;