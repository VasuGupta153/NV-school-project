import React, {useState, useEffect} from "react"
import "./AlbumCard.css"
import { Link } from "react-router-dom"
import { getAllPhotos } from "../PhotosPage/helper/PhotosPageApis"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SyncLoader from "react-spinners/SyncLoader";


const AlbumCard = (props) => {

    const [photos, setPhotos] = useState([])
    
    const preloadPhotos = () => {
        setLoader(true)
        getAllPhotos().then(data => {
            if(data.err){
                toast.error("Error Occured!")
                setLoader(false)
            } else{
                setLoader(false)
                setPhotos(data)
            }
        })
    }

    useEffect(() => {
        preloadPhotos();
    }, [])

    // loader----------------------------------------------------------
    const [loader, setLoader] = useState(false)

    const override = `
    display: block;
    margin: 100px auto 350px;
    text-align: center;
    border-color: red;
    `;

    var array = [];
    var arrayIndex = 0;

    return(
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
        {!loader && <div className="gallery-albums-container">
            {props.albums.map((album, index)=>{
                if(arrayIndex >= 1){
                    array = [];
                    arrayIndex=0;
                }
                return(
                    <div key={index} className="album-card-container">
                        <Link style={{color: "white", textDecoration: "none"}} to={`/gallery/${album.name}/${album._id}/photos`}>
                            <div className="album-title-container">
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
                    </div>
                )
            })}
        </div>}
        
        </div>
    )
}

export default AlbumCard; 