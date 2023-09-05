import React, {useState, useEffect} from 'react'
import "./UpdateStaff.css"
import AdminHeader from "../../CoreComponents/Header/Header"
import AdminFooter from "../../CoreComponents/Footer/Footer"
import {getStaff, updateStaff} from "../helper/StaffApis"
import {isAuthenticated} from "../../AuthComponents/helper/authapis"
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const UpdateStaff = ({match, history}) => {

    const [staffphotoURL, setStaffPhotoURL] = useState(""); 
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("")
    const [name, setName] = useState("")
    const [loader1, setLoader1] = useState(false)
    const [loader, setLoader] = useState(false)
    const {token} = isAuthenticated()

    const preload = (staffId) => {
        setLoader(true)
        getStaff(staffId).then(data => {
            if(data.err){
                setLoader(false)
                toast.error("Error Occured!")
            } else{
                setLoader(false)
                setStaffPhotoURL(data.staffphotoURL);
                setDescription(data.description);
                setContent(data.content);
                setName(data.name);
            }
        })
    }

    useEffect(() => {
        preload(match.params.staffId);
    }, [match.params.staffId])

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
        setLoader1(true)
        updateStaff(match.params.staffId, "ayush", token, {staffphotoURL, description, content, name})
        .then(data => {
            if(data.error){
                toast.error("Error Occured!");
                setLoader1(false)
            } else{
                toast.success("Staff Details Updated Successfully!");
                preload(match.params.staffId);
                setLoader1(false)
            }
        })
    }

    const override = `
    display: block;
    margin: 100px auto 350px;
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
                <div className="staff-update-outer-container">
                    <div className="staff-update-inner-container">Update Staff</div>
                </div>
                <SyncLoader
                css={override}
                loading={loader}
                size={10}
                color="#B80924"
                />
                {!loader && <div><div className="staff-update-form-container">
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
                        
                        <div onClick={onSubmit} className="update-staff-btn-inside">
                        <SyncLoader
                        css={override1}
                        loading={loader1}
                        size={10}
                        color="white"
                        />{!loader1 && <span>Update</span>}</div> 
                    </form>
                </div>
                <div  className="go-back-update-staff-page"><span onClick={history.goBack}>Go Back</span></div></div>}
            <AdminFooter />
        </div>
    )
}

export default UpdateStaff
