import React, {useState, useEffect} from "react"
import "./PhotosPage.css"
import Header from "../../../../CoreComponents/Header/Header"
import Footer from "../../../../CoreComponents/Footer/Footer"
import { getAllPhotos } from "./helper/PhotosPageApis"
import { getAllVideos } from "./helper/PhotosPageApis"
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import dont from"../../../../images/dont-know.png"
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PhotosPage = ({match}) => {

    const [photos, setPhotos] = useState([])
    const [videos, setVideos] = useState([])
    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const [photoClass, setPhotoClass] = useState("heading-bottom-border");
    const [videoClass, setVideoClass] = useState("");
    const [photoDisplay, setPhotoDisplay] = useState("block");
    const [videoDisplay, setVideoDisplay] = useState("none");
    
    const preloadPhotos = () => {
        setLoader(true)
        getAllPhotos().then(data => {
            if(data.err){
                toast.error("Error Occured!")
                setLoader(false)
            } else{
                setPhotos(data)
                setLoader(false)
            }
        }) 
    }

    const preloadVideos = () => {
        setLoader(true)
        getAllVideos().then(data => {
            if(data.err){
                toast.error("Error Occured!")
                setLoader(false)
            } else{
                setVideos(data)
                setLoader(false)
            }
        }) 
    }

    useEffect(() => {
        preloadPhotos();
        preloadVideos();
    }, [])

    var imagesForLightbox = [];
    var i = 0;

    // loader----------------------------------------------------------
    const [loader, setLoader] = useState(false)
    
    const override = `
    display: block;
    margin: 100px auto 300px;
    text-align: center;
    border-color: red;
    `;

    return(
        <div>
            <Header />
            <ToastContainer 
            hideProgressBar={false}
            newestOnTop={true}
            autoClose={3000}
            position={"top-right"}
            />
                <div className="album-name-outer-container">
                    <div className="album-name-inner-container">{match.params.albumName}</div>
                </div>
                <div className="photos-videos-heading-container">
                    <div onClick={()=>{setPhotoClass("heading-bottom-border");setVideoClass("");setPhotoDisplay("block");setVideoDisplay("none")}} className={`photos-heading ${photoClass}`}>
                        <h3>Photos</h3>
                    </div>
                    <div onClick={()=>{setPhotoClass("");setVideoClass("heading-bottom-border");setPhotoDisplay("none");setVideoDisplay("block")}} className={`videos-heading ${videoClass}`}>
                        <h3>Videos</h3>
                    </div>
                </div>
                <SyncLoader
                css={override}
                loading={loader}
                size={10}
                color="#B80924"
                />
                <div style={{display: `${photoDisplay}`}}>
                <div className="gallery-photos-container">
                    {photos.map((photo, index) => {
                        if(photo.album === match.params.albumId){
                            imagesForLightbox[index-1] = `${photo.photoURL}`;
                            return(
                                <div key={index} className="photo-card-container">
                                    <img onClick={()=>{setPhotoIndex(index-1);setIsOpen(true);}} src={photo.photoURL} alt="Can't Load"></img>
                                </div>
                            )
                        } else{
                            return(null)
                        }
                    })}
                </div>
                </div>
                <div style={{display: `${videoDisplay}`}}>
                    <div className="gallery-videos-container">
                        {videos.map((video, index) => {
                            if(index === videos.length-1 && video.album !== match.params.albumId && i===0){
                                return(
                                    <div>
                                        <img src={dont} width="250" height="300" alt="Can't Load"></img>
                                    </div>
                                )
                            }
                            if(video.album === match.params.albumId){
                                i++;
                                return(
                                    <div key={index} className="video-card-container">
                                        <iframe src={video.videoURL} title="video" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                    </div>
                                )
                            } else{return(null)}
                            
                        })}
                    </div>
                </div>
                
                {isOpen && (
                    <Lightbox 
                    mainSrc={imagesForLightbox[photoIndex]}
                    nextSrc={imagesForLightbox[(photoIndex + 1) % imagesForLightbox.length]}
                    prevSrc={imagesForLightbox[(photoIndex + imagesForLightbox.length - 1) % imagesForLightbox.length]}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() => setPhotoIndex((photoIndex + imagesForLightbox.length - 1) % imagesForLightbox.length)}
                      onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % imagesForLightbox.length)}
                    />
                )}
            <Footer />
        </div>
    )
}

export default PhotosPage;