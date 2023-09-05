import React, {useState} from 'react'
import "./AddStaff.css"
import AdminHeader from "../../CoreComponents/Header/Header"
import AdminFooter from "../../CoreComponents/Footer/Footer"
import {createStaff} from "../helper/StaffApis" 
import {isAuthenticated} from "../../AuthComponents/helper/authapis"
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddStaff= ({history}) => { 
    
    const [staffphotoURL, setStaffPhotoURL] = useState(""); 
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("")
    const [name, setName] = useState("")
    const [loader, setLoader] = useState(false)
 
    const {token} = isAuthenticated()  

    const handleChange = event => {
        setStaffPhotoURL(event.target.value)
    }
    const handleChange1 = event => {
        setDescription(event.target.value)
    }
    const handleChange2 = event => {
        setContent(event.target.value)
    }
    const handleChange3 = event => {
        setName(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if(staffphotoURL === "" || description === "" || content === "" || name === ""){
            toast.error("Input Can't Be Empty");
            return;
        }
        setLoader(true)
        createStaff("ayush", token, {staffphotoURL, description, content, name})
        .then(data => {
            if(data.error){
                toast.error("Error Occured!");
                setLoader(false)
            } else{
                toast.success("Staff Added Successfully!");
                setLoader(false)
                setStaffPhotoURL("");
                setDescription("");
                setContent("");
                setName("");
            }
        })
    }

    const override = `
    display: block;
    text-align: center;
    border-color: white;
    `;

    return (
        <div className="add-staff-whole-container">
            <AdminHeader />
                <ToastContainer 
                hideProgressBar={false}
                newestOnTop={true}
                autoClose={3000}
                position={"top-right"}
                />
                <div className="add-staff-outer-container">
                    <div className="add-staff-inner-container">Add Staff</div>
                </div>
                <div className="add-staff-form-container">
                    <form>
                    <label>Name</label><br></br>
                        <input 
                        type="text"
                        onChange={handleChange3}
                        value={name}
                        ></input><br></br>
                        <label>Description</label><br></br>
                        <input 
                        type="text"
                        onChange={handleChange1}
                        value={description}
                        ></input><br></br>
                        <label>Image Url</label><br></br>
                        <input 
                        type="text"
                        onChange={handleChange}
                        value={staffphotoURL}
                        ></input><br></br>
                        <label>Content</label><br></br>
                        <textarea
                        onChange={handleChange2}
                        value={content}
                        ></textarea><br></br>
                        
                        <div onClick={onSubmit} className="add-staff-btn-inside">
                        <SyncLoader
                        css={override}
                        loading={loader}
                        size={10}
                        color="white"
                        />
                                {!loader && <span>Add Notice</span>}
                        </div>
                    </form>
                </div>
                <div  className="go-back-add-staff-page"><span onClick={history.goBack}>Go Back</span></div>
            <AdminFooter />
        </div>
    )
}

export default AddStaff
