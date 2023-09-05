import React, {useState, useEffect} from "react";
import Header from "../../CoreComponents/Header/Header";
import "./Home.css";
import Slideshow from "./ImageSlider/ImageSlider";
// import LetsGetInspired from "./LetsGetInspired/LetsGetInspired";
import NoticeBoard from "./NoticeBoard/NoticesBoard";
import Principal from "./Principal/Principal";
import FooterImageSlider from "./FooterImageSlider/FooterImageSlider";
import Footer from "../../CoreComponents/Footer/Footer";

import "./LetsGetInspired/LetsGetInspired.css";
import leftQuotation from "../../images/Left-quotation.svg";
import rightQuotation from "../../images/Right-quotation.svg";
// import Slideshow from "./QuoteSlider/QuoteSlider";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import "./LetsGetInspired/QuoteSlider/QuoteSlider.css"
import {getallLetsGetInspired} from "./LetsGetInspired/helper/LetGetInspiredApis"
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const properties = {
    duration: 4000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: false
}

const Home = () => {

    const [letsGetInspired, setLetsGetInspired] = useState([])

    const preloadLetsGetInspired = () => {
      setLoader(true)
      getallLetsGetInspired().then(data => {
            if(data.error){
              toast.error("Error Occured!")
              setLoader(false)
            } else{
              setLetsGetInspired(data)
              setLoader(false)
            }
        })
    }

    useEffect(() => {
      preloadLetsGetInspired()
    }, [])

    // loader----------------------------------------------------------
    const [loader, setLoader] = useState(false)
    
    const override = `
    display: block;
    margin: 60px auto;
    text-align: center;
    border-color: red;
    `;


    return(
        <div>
            <Header />
            <Slideshow />
            
            {!loader && <div className="quote-notice-container">
            <div className="lets-get-inspired-container">
            <img src={leftQuotation} alt="Can't Load"></img>
            <img src={rightQuotation} alt="Can't Load"></img>
            <div className="heading"><h2>Let's Get Inspired</h2></div>
            <div>
            <div className="quote-slide-container">
            <ToastContainer 
            hideProgressBar={false}
            newestOnTop={true}
            autoClose={3000}
            position={"top-right"}
            />
            <SyncLoader
                        css={override}
                        loading={loader}
                        size={8}
                        color="#B80924"
                        />
            <Slide {...properties}>
            {letsGetInspired.map((letsGetInspired, index) => {
                return(
                    <div key={index} className="quote-each-slide">
                        <div><p><em>{letsGetInspired.quote}</em></p></div>
                        <div><p><strong>-{letsGetInspired.author}</strong></p></div>
                    </div>
                )
            })}
            </Slide>
            </div>
            </div>
            </div> 
                <NoticeBoard />
            </div>}     
            

            <Principal />
            <FooterImageSlider />
            <Footer />
        </div>
    )
}

export default Home;