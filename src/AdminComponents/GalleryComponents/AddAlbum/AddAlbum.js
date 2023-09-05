import React, {useState} from 'react'
import "./AddAlbum.css"
import AdminHeader from "../../CoreComponents/Header/Header"
import AdminFooter from "../../CoreComponents/Footer/Footer"
import {createAlbum} from "../PhotoAlbums/helper/PhotoAlbumsApi" 
import {isAuthenticated} from "../../AuthComponents/helper/authapis"
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddAlbum= ({history}) => {  
    
    const [name, setName] = useState("")
    const [loader, setLoader] = useState(false)

    const {token} = isAuthenticated()  

    const handleChange = event => {
        setName(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if(name === ""){
            toast.error("Input Can't Be Empty");
            return;
        }
        setLoader(true)
        createAlbum("ayush", token, {name})
        .then(data => {
            if(data.error){
                toast.error("Error Occured!");
                setLoader(false)
            } else{
                toast.success("Album Created Successfully!");
                setName("")
                setLoader(false)
            }
        })
    }

    const override = `
    display: block;
    text-align: center;
    border-color: white;
    `;

    return (
        <div className="add-album-whole-container">
            <AdminHeader />
                <ToastContainer 
                hideProgressBar={false}
                newestOnTop={true}
                autoClose={3000}
                position={"top-right"}
                />
                <div className="add-album-outer-container">
                    <div className="add-album-inner-container">Create Album</div>
                </div>
                <div className="add-album-form-container">
                    <form>
                        <label>Name</label><br></br>
                        <input 
                        type="text"
                        onChange={handleChange}
                        value={name}
                        ></input><br></br>
                        
                        <div onClick={onSubmit} className="add-album-btn-inside">
                        <SyncLoader
                        css={override}
                        loading={loader}
                        size={10}
                        color="white"
                        />
                                {!loader && <span>Create Album</span>}
                        </div>
                    </form>
                </div>
                <div  className="go-back-add-album-page"><span onClick={history.goBack}>Go Back</span></div>
            <AdminFooter />
        </div>
    )
}

export default AddAlbum
