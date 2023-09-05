import React, {useState, useEffect} from 'react'
import "./UpdateAlbum.css"
import AdminHeader from "../../CoreComponents/Header/Header"
import AdminFooter from "../../CoreComponents/Footer/Footer"
import {updateAlbum, getAlbum} from "../PhotoAlbums/helper/PhotoAlbumsApi"
import {isAuthenticated} from "../../AuthComponents/helper/authapis"
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateAlbum = ({match, history}) => {

    const [name, setName] = useState(""); 
    const [loader, setLoader] = useState(false)
    const [loader1, setLoader1] = useState(false)
    const {token} = isAuthenticated()
 
    const preload = (albumId) => {
        setLoader(true)
        getAlbum(albumId).then(data => {
            if(data.err){
                setLoader(false)
                toast.error("Error Occured!")
            } else{
                setLoader(false)
                setName(data.name);
            }
        })
    }

    useEffect(() => {
        preload(match.params.albumId);
    }, [match.params.albumId])

    const handleChange = event => {
        setName(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if(name === ""){
            toast.error("Input Can't Be Empty");
            return;
        }
        setLoader1(true)
        updateAlbum(match.params.albumId, "ayush", token, {name} )
        .then(data => {
            if(data.error){
                toast.error("Error Occured!");
                setLoader1(false)
            } else{
                toast.success("Album Name Updated Successfully!");
                preload(match.params.albumId);
                setLoader1(false)
            }
        })
    }

    const override = `
    display: block;
    margin: 140px auto 300px;
    text-align: center;
    border-color: red;
    `;

    const override1 = `
    display: block;
    text-align: center;
    border-color: white;
    `;

    return (
        <div style={{backgroundColor: "#e9eff3"}}>
            <AdminHeader />
                <ToastContainer 
                hideProgressBar={false}
                newestOnTop={true}
                autoClose={3000}
                position={"top-right"}
                />
                <div className="album-update-outer-container">
                    <div className="album-update-inner-container">Update Album</div>
                </div>
                <SyncLoader
                css={override}
                loading={loader}
                size={10}
                color="#B80924"
                />
                {!loader && <div><div className="album-update-form-container">
                    <form>
                        <label>Name</label><br></br>
                        <input 
                        type="text"
                        onChange={handleChange}
                        value={name}
                        ></input><br></br>
                        
                        <div onClick={onSubmit} className="update-album-btn-inside"><SyncLoader
                        css={override1}
                        loading={loader1}
                        size={10}
                        color="white"
                        />{!loader1 && <span>Update</span>}</div> 
                    </form>
                </div>
                <div  className="go-back-update-album-page"><span onClick={history.goBack}>Go Back</span></div></div>}
            <AdminFooter />
        </div>
    )
}

export default UpdateAlbum
