import React, {useState} from 'react';
import AdminHeader from '../../CoreComponents/Header/Header'
import AdminFooter from '../../CoreComponents/Footer/Footer'
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import "./UpdateAdmission.css"
import { updateAdmission } from '../helper/AdmissionApis';
import {isAuthenticated} from "../../AuthComponents/helper/authapis"
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const UpdateAdmission = ({history}) => {

    const [text, setText] = useState("")
    const content = text;
    const {token} = isAuthenticated()

    const onSubmit = (event) => {
        if(content === ""){
            toast.error("Input cant't be Empty!");
            return;
        }
        setLoader(true)
        event.preventDefault()
        updateAdmission("ayush", token, {content}).then(data => {
            if(data.error){
                setLoader(false)
                toast.error("Error Occured!")
            } else{
                setLoader(false)
                toast.success("Updated Successfully!")
            }
        })
    }

    // loader----------------------------------------------------------
    const [loader, setLoader] = useState(false)
    
    const override = `
    display: block;
    margin: 0px auto 0px;
    border-color: white;
    `;

    const handleChange = (content) => {
        setText(content);
    }

    return (
    <div>
        <AdminHeader />
            <ToastContainer 
            hideProgressBar={false}
            newestOnTop={true}
            autoClose={3000}
            position={"top-right"}
            />
            <div className="update-admission-heading-outer-container">
                <div className="update-admission-heading-inner-container">Update Admission</div>
            </div>
            <div className="editor-container">
                <SunEditor 
                    height="300px"
                    autoFocus={true}
                    setDefaultStyle="font-family: 'Poppins', sans-serif;font-size: 16px;"
                    show={true}
                    showToolbar={true}
                    enableToolbar={true}
                    setOptions={{buttonList: [['undo', 'redo'], ['formatBlock','list','align']]}}
                    onChange={handleChange}
                />
                <div onClick={onSubmit} className="update-admission-inner-btn">
                    <SyncLoader
                    css={override}
                    loading={loader}
                    size={10}
                    color="white"
                    />{!loader && <span>Update</span>}
                </div>
                <div  className="go-back-update-admission-page"><span onClick={history.goBack}>Go Back</span></div>
            </div>
        <AdminFooter />
    </div>
    );
};

export default UpdateAdmission;