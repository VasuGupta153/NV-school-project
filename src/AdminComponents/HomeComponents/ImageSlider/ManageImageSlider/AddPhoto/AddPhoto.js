import React, {useState} from 'react'
import "./AddPhoto.css"
import AdminHeader from "../../../../CoreComponents/Header/Header"
import AdminFooter from "../../../../CoreComponents/Footer/Footer"
import {createHeaderPhoto} from "../../helper/ImageSliderApis" 
import {isAuthenticated} from "../../../../AuthComponents/helper/authapis"
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddPhoto= ({history}) => {


    const [headerphotoURL, setHeaderPhotoURL] = useState("")
    const [loader, setLoader] = useState(false)

    const {token} = isAuthenticated()

    const handleChange = event => {
        setHeaderPhotoURL(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if(headerphotoURL === ""){
            toast.error("Please add URL");
            return;
        }
        setLoader(true)
        createHeaderPhoto("ayush", token, {headerphotoURL})
        .then(data => {
            if(data.error){
                toast.error("Error Occured!");
                setLoader(false)
            } else{
                toast.success("Photo Added Successfully!");
                setHeaderPhotoURL("")
                setLoader(false)
            }
        })
    }

    const override = `
    display: block;
    text-align: center;
    border-color: red;
    `;

    return (
        <div className="add-photo-whole-container">
            <AdminHeader />
                <ToastContainer 
                hideProgressBar={false}
                newestOnTop={true}
                autoClose={3000}
                position={"top-right"}
                />
                <div className="manage-slider-outer-container">
                    <div className="manage-slider-inner-container">Manage Slider Photos</div>
                </div>
                <div className="add-photo-form-container">
                    <form>
                        <label>Image Url</label><br></br>
                        <input type="text"
                        onChange={handleChange}
                        value={headerphotoURL}
                        required></input><br></br>
                        
                        <div onClick={onSubmit} className="add-photo-btn-inside">
                        <SyncLoader
                        css={override}
                        loading={loader}
                        size={10}
                        color="white"
                        />
                                {!loader && <span>Add Photo</span>}
                        </div>
                    </form>
                </div>
                <div  className="go-back-add-photo-page"><span onClick={history.goBack}>Go Back</span></div>
            <AdminFooter />
        </div>
    )
}

export default AddPhoto
