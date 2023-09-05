import React, {useState, useEffect} from 'react'
import "./AddPhoto.css"
import AdminHeader from "../../CoreComponents/Header/Header"
import AdminFooter from "../../CoreComponents/Footer/Footer"
import {getAllAlbums} from "../PhotoAlbums/helper/PhotoAlbumsApi" 
import {createAlbumPhoto} from "../PhotoAlbums/PhotosPage/helper/PhotosPageApis" 
import {isAuthenticated} from "../../AuthComponents/helper/authapis"
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddAlbumPhoto= ({history}) => { 

    const [loader, setLoader] = useState(false)
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
    
    const [photoURL, setPhotoURL] = useState("")
    const [album, setAlbum] = useState("")
    const [loader1, setLoader1] = useState(false)
 
    const {token} = isAuthenticated()  

    const handleChange = event => {
        setPhotoURL(event.target.value)
    }
    const handleChange1 = event => {
        setAlbum(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if(photoURL === "" || album === ""){
            toast.error("Input Can't Be Empty");
            return;
        }
        setLoader1(true)
        createAlbumPhoto("ayush", token, {photoURL, album})
        .then(data => {
            if(data.error){
                toast.error("Error Occured!");
                setLoader1(false)
            } else{
                toast.success("Photo Added Successfully!");
                setPhotoURL("")
                setLoader1(false)
            }
        })
    }

    const override = `
    display: block;
    text-align: center;
    margin: 100px auto 350px;
    border-color: red;
    `;
    const override1 = `
    display: block;
    text-align: center;
    border-color: white;
    `;

    return (
        <div className="add-album-photo-whole-container">
            <AdminHeader />
                <ToastContainer 
                hideProgressBar={false}
                newestOnTop={true}
                autoClose={3000}
                position={"top-right"}
                />
                <div className="add-album-photo-outer-container">
                    <div className="add-album-photo-inner-container">Add Photo</div>
                </div>
                <SyncLoader
                        css={override}
                        loading={loader}
                        size={10}
                        color="#B80924"
                        />
                {!loader && <div><div className="add-album-photo-form-container">
                    <form>
                        <label>Image Url</label><br></br>
                        <input 
                        type="text"
                        onChange={handleChange}
                        value={photoURL}
                        ></input><br></br>
                        <label>Select Album</label><br></br>
                        <select
                        onChange={handleChange1}
                        placeholder="Album"
                        >
                        <option>Select</option>
                        {albums &&
                        albums.map((album, index) => (
                        <option key={index} value={album._id}>{album.name}</option>
                        ))}
                        </select>
                        
                        <div onClick={onSubmit} className="add-album-photo-btn-inside">
                        <SyncLoader
                        css={override1}
                        loading={loader1}
                        size={10}
                        color="white"
                        />
                                {!loader1 && <span>Add Photo</span>}
                        </div>
                    </form>
                </div>
                <div  className="go-back-add-album-photo-page"><span onClick={history.goBack}>Go Back</span></div>
                </div>
                }
                
            <AdminFooter />
        </div>
    )
}

export default AddAlbumPhoto
