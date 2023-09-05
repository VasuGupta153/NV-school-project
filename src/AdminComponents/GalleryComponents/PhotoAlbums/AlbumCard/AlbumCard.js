import React, {useState, useEffect} from "react"
import "./AlbumCard.css"
import { Link } from "react-router-dom"
import { getAllPhotos, getAllVideos } from "../PhotosPage/helper/PhotosPageApis"
import SyncLoader from "react-spinners/SyncLoader";
import Popup from "reactjs-popup";
import {deleteAlbum, getAllAlbums} from "../helper/PhotoAlbumsApi"
import {deleteAlbumPhoto, deleteAlbumVideo} from "../PhotosPage/helper/PhotosPageApis"
import {isAuthenticated} from "../../../AuthComponents/helper/authapis"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AlbumCard = () => {

    const [photos, setPhotos] = useState([])
    
    const preloadPhotos = () => {
        getAllPhotos().then(data => { 
            if(data.err){
                toast.error("Error Occured!")
            } else{
                setPhotos(data)
            }
        })
    }

    useEffect(() => {
        preloadPhotos();
    }, [])

    const [videos, setVideos] = useState([])
    
    const preloadVideos = () => {
        getAllVideos().then(data => {
            if(data.err){
                toast.error("Error Occured!")
            } else{
                setVideos(data)
            }
        })
    }

    useEffect(() => {
        preloadVideos();
    }, [])

    var array = [];
    var arrayIndex = 0;

    const [albums, setAlbums] = useState([])

    const preloadAlbums = () => {
        setLoader(true)
        getAllAlbums().then(data => {
            if(data.error){
                toast.error("Error Occured!")
                setLoader(false)
            } else{
                setLoader(false)
                setAlbums(data)
            }
        })
    }

    useEffect(() => {
        preloadAlbums()
    }, [])

    //-----------------------------------------------------------------------------------
    // Loader-----------------------------------
    const [loader1, setLoader1] = useState(false)

    const override1 = `
    display: block;
    margin: 0px auto;
    text-align: center;
    border-color: red;
    `;

    // loader----------------------------------------------------------
    const [loader, setLoader] = useState(false)
    
    const override = `
    display: block;
    margin: 100px auto 350px;
    text-align: center;
    border-color: red;
    `;

  //Popup-------------------------------------------
    const [popup, setPopup] = useState(false)
    const [albumId, setAlbumId] = useState("")

    const popupFunction = (id) => {
        setPopup(true)
        setAlbumId(id)
    }

    //Delete image--------------------------------------
    const {token} = isAuthenticated()

    const deleteOnSubmit = (albumId) => {
        setLoader1(true)
        photos.map((photo)=>{
            if(photo.album === albumId){
                deleteAlbumPhoto(photo._id, "ayush", token)
                .then(data=>{
                    if(data.error){
                        toast.error("Error Occured!")
                    }
                })
            } return(null)
        })
        videos.map((video)=>{
            if(video.album === albumId){
                deleteAlbumVideo(video._id, "ayush", token)
                .then(data=>{
                    if(data.error){
                        toast.error("Error Occured!")
                    }
                })
            } return(null)
        })
        deleteAlbum(albumId, "ayush", token)
        .then(data => {
            if(data.error){
                toast.error("Album Not Deleted!");
                setLoader1(false)
                setPopup(false)
            } else{
                setLoader1(false)
                toast.success("Album Deleted Successfully!");
                preloadAlbums()
                setPopup(false)
            }
        })
    }


    return(
        <div>
            <ToastContainer 
            hideProgressBar={false}
            newestOnTop={true}
            autoClose={3000}
            position={"top-right"}
            />
                <Popup contentStyle={{width: "75%", padding: "50px 0px"}} modal open={popup}  onClose={()=>setPopup(false)}>
                    <div className="delete-confirmation">All Photos and Videos related to Album will also be Deleted?</div>
                    <SyncLoader
                    css={override1}
                    loading={loader1}
                    size={10}
                    color="#B80924"
                    />
                    {!loader1 && (
                    <div style={{display: "flex", justifyContent: "center"}}>
                    <div className="delete-btn" onClick={() => {deleteOnSubmit(albumId)}}>Delete</div>
                    <div className="cancel-btn" onClick={()=>setPopup(false)}>Cancel</div>
                    </div>
                    )}
                </Popup>
                <SyncLoader
            css={override}
            loading={loader}
            size={10}
            color="#B80924"
            />
            {!loader && <div className="gallery-albums-container">
            {albums.map((album, index)=>{
                if(arrayIndex >= 1){
                    array = [];
                    arrayIndex=0;
                }
                return(
                    <div key={index} className="album-card-container">
                        <Link style={{color: "white", textDecoration: "none"}} to={`/admin/gallery/${album.name}/${album._id}/photos`}>
                            <div className="admin-album-title-container">
                                <div className="album-photo-container">
                                    {photos.map((photo, index)=> {
                                        if(album._id === photo.album){
                                            array[arrayIndex] = `${photo.photoURL}`;
                                            arrayIndex = arrayIndex+1;
                                            if(array.length===1){
                                                return(
                                                    <img key={index} src={array[0]} alt="Can't Load"></img>
                                                )
                                            } else{return(null)}
                                        } else{return(null)}
                                    })}
                                </div>
                                <div className="album-card-title">
                                    {album.name}
                                </div>
                            </div>
                        </Link>

                        <Link style={{color: "white", textDecoration: "none"}} to={`/admin/album/update/${album._id}`}><div id="update-btn-gallery-album">Update</div></Link>
                        <div id="delete-btn-gallery-album" onClick={()=>popupFunction(album._id)}>Delete</div>
                    </div> 
                )
            })}
        </div>}
        
        </div>
    )
}

export default AlbumCard; 