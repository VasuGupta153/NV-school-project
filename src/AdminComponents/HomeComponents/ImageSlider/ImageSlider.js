import React, {useState, useEffect} from 'react';
import { Slide } from 'react-slideshow-image';
import {Link} from "react-router-dom"
import '../../../../node_modules/react-slideshow-image/dist/styles.css'
import "./ImageSlider.css"
import {getallHeaderPhotos} from "./helper/ImageSliderApis" 
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

  const [headerPhotos, setHeaderPhotos] = useState([])

    const preloadHeaderPhotos = () => {
      setLoader(true)
      getallHeaderPhotos().then(data => {
            if(data.error){
              toast.error("Error Occured!")
              setLoader(false)
            } else{
              setHeaderPhotos(data)
              setLoader(false)
            }
        })
    }

    useEffect(() => {
      preloadHeaderPhotos()
    }, [])

  // Loader-----------------------------------
  const [loader, setLoader] = useState(false)
    
  const override = `
  display: block;
  margin: 100px auto;
  text-align: center;
  border-color: red;
  `;

    return (
      <div>
        <ToastContainer 
        hideProgressBar={false}
        newestOnTop={true}
        autoClose={3000}
        position={"top-right"}
        />
        <SyncLoader
                    css={override}
                    loading={loader}
                    size={10}
                    color="#B80924"
                    />
      {!loader && <div className="slide-container">
        
        <Link style={{color: "white", textDecoration: "none"}} to="/admin/managesliderphotos"><div className="image-slider-manage-btn">Manage Slider Photos</div></Link>
                    
        <Slide {...properties}>
          {headerPhotos.map((image, index) => {
              return(
                <div key={index} className="each-slide">
                    <div style={{'backgroundImage': `url(${image.headerphotoURL})`}}></div>
                </div>
              )
          })}
        </Slide>

      </div>}
      
      </div>
    )
}

export default Slideshow;