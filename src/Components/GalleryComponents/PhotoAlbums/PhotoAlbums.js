import React, {useState, useEffect} from "react"
import "./PhotoAlbums.css"
import AlbumCard from "./AlbumCard/AlbumCard"
import {getAllAlbums} from "./helper/PhotoAlbumsApi"
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PhotoAlbums = () => {

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

    // loader----------------------------------------------------------
    const [loader, setLoader] = useState(false)
    
    const override = `
    display: block;
    margin: 100px auto 350px;
    text-align: center;
    border-color: red;
    `;

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
            {!loader && <AlbumCard albums={albums}/>}
        </div>
    )
}

export default PhotoAlbums;