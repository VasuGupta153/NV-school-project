import React, {useState, useEffect} from "react"
import "./PhotosPage.css"
import AdminHeader from "../../../CoreComponents/Header/Header"
import AdminFooter from "../../../CoreComponents/Footer/Footer"
import { getAllPhotos, deleteAlbumVideo, deleteAlbumPhoto, getAllVideos } from "./helper/PhotosPageApis"
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Popup from "reactjs-popup";
import dont from"../../../../images/dont-know.png";
import SyncLoader from "react-spinners/SyncLoader";
import {isAuthenticated} from "../../../AuthComponents/helper/authapis"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AdminPhotosPage = ({match}) => {

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
                setLoader(false)
                toast.error("Error Occured in loading photos!");
            } else{
                setPhotos(data)
                setLoader(false)
            }
        }) 
    }
    const preloadVideos = () => {
        setVideosLoader(true)
        getAllVideos().then(data => {
            if(data.err){
                setVideosLoader(false)
                toast.error("Error Occured in loading videos!");
            } else{
                setVideos(data)
                setVideosLoader(false)
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
    const [videosloader, setVideosLoader] = useState(false)
    
    const override = `
    display: block;
    margin: 100px auto 300px;
    text-align: center;
    border-color: red;
    `;
    // Loader-----------------------------------
    const [loader1, setLoader1] = useState(false)
    const [loader2, setLoader2] = useState(false)
    
    const override1 = `
    display: block;
    margin: 0px auto;
    text-align: center;
    border-color: red;
    `;

  //Popup-------------------------------------------
    const [popup, setPopup] = useState(false)
    const [popup1, setPopup1] = useState(false)
    const [photoId, setPhotoId] = useState("")
    const [videoId, setVideoId] = useState("")

    const popupFunction = (id) => {
        setPopup(true)
        setPhotoId(id)
    }
    const popupFunction1 = (id) => {
        setPopup1(true)
        setVideoId(id)
    }

    //Delete image--------------------------------------
    const {token} = isAuthenticated()

    const deletePhotoOnSubmit = (photoId) => {
        setLoader1(true)
        deleteAlbumPhoto(photoId, "ayush", token)
        .then(data => {
            if(data.error){
                toast.error("Photo Not Deleted!");
                setLoader1(false)
                setPopup(false)
            } else{
                setLoader1(false)
                toast.success("Photo Deleted Successfully!");
                preloadPhotos()
                setPopup(false)
            }
        })
    }
    //Delete video--------------------------------------
    const deleteVideoOnSubmit = (videoId) => {
        setLoader2(true)
        deleteAlbumVideo(videoId, "ayush", token)
        .then(data => {
            if(data.error){
                toast.error("Video Not Deleted!");
                setLoader2(false)
                setPopup1(false)
            } else{
                setLoader2(false)
                toast.success("Video Deleted Successfully!");
                preloadVideos()
                setPopup1(false)
            }
        })
    }

    return(
        <div>
            <AdminHeader />
            <ToastContainer 
            hideProgressBar={false}
            newestOnTop={true}
            autoClose={3000}
            position={"top-right"}
            />
            <Popup contentStyle={{width: "75%", padding: "50px 0px"}} modal open={popup}  onClose={()=>setPopup(false)}>
                    <div className="delete-confirmation">Are you sure you want to Delete Photo?</div>
                    <SyncLoader
                    css={override1}
                    loading={loader1}
                    size={10}
                    color="#B80924"
                    />
                    {!loader1 && (
                    <div style={{display: "flex", justifyContent: "center"}}>
                    <div className="delete-btn" onClick={() => {deletePhotoOnSubmit(photoId)}}>Delete</div>
                    <div className="cancel-btn" onClick={()=>setPopup(false)}>Cancel</div>
                    </div>
                    )}
                </Popup>
            <Popup contentStyle={{width: "75%", padding: "50px 0px"}} modal open={popup1}  onClose={()=>setPopup1(false)}>
                    <div className="delete-confirmation">Are you sure you want to Delete Video?</div>
                    <SyncLoader
                    css={override1}
                    loading={loader2}
                    size={10}
                    color="#B80924"
                    />
                    {!loader2 && (
                    <div style={{display: "flex", justifyContent: "center"}}>
                    <div className="delete-btn" onClick={() => {deleteVideoOnSubmit(videoId)}}>Delete</div>
                    <div className="cancel-btn" onClick={()=>setPopup1(false)}>Cancel</div>
                    </div>
                    )}
                </Popup>
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
                {!loader && <div style={{display: `${photoDisplay}`}}>
                <div className="gallery-photos-container">
                    {photos.map((photo, index) => {
                        if(photo.album === match.params.albumId){
                            imagesForLightbox[index-1] = `${photo.photoURL}`;
                            return(
                                <div key={index} className="photo-card-container">
                                    <img onClick={()=>{setPhotoIndex(index-1);setIsOpen(true);}} src={photo.photoURL} alt="Can't Load"></img>
                                    <div id="delete-btn-in-photos-page" onClick={()=>popupFunction(photo._id)}><i className="far fa-trash-alt"></i></div>
                                </div>
                            )
                        } else{return(null)}
                    })}
                </div>
                </div>}
                
                {/* <SyncLoader
                css={override}
                loading={videosloader}
                size={10}
                color="#B80924"
                /> */}
                {!videosloader && <div style={{display: `${videoDisplay}`}}>
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
                                    <div id="delete-btn-in-photos-page" onClick={()=>popupFunction1(video._id)}><i className="far fa-trash-alt"></i></div>
                                    </div>
                                )
                            } else{return(null)}
                            
                        })}
                    </div>
                </div>}
                
                
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
            <AdminFooter />
        </div>
    )
}

export default AdminPhotosPage;