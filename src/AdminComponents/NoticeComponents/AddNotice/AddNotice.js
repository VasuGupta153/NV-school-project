import React, {useState} from 'react'
import "./AddNotice.css"
import AdminHeader from "../../CoreComponents/Header/Header"
import AdminFooter from "../../CoreComponents/Footer/Footer"
import {createNotice} from "../../HomeComponents/NoticeBoard/helper/NoticeBoardApis" 
import {isAuthenticated} from "../../AuthComponents/helper/authapis"
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddNotice= ({history}) => { 
    
    const [noticeHeading, setNoticeHeading] = useState("")
    const [noticeContent, setNoticeContent] = useState("")
    const [loader, setLoader] = useState(false)

    const {token} = isAuthenticated()  

    const handleChange = event => {
        setNoticeHeading(event.target.value)
    }
    const handleChange1 = event => {
        setNoticeContent(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if(noticeHeading === "" || noticeContent === ""){
            toast.error("Input Can't Be Empty");
            return;
        }
        setLoader(true)
        createNotice("ayush", token, {noticeHeading, noticeContent})
        .then(data => {
            if(data.error){
                toast.error("Error Occured!");
                setLoader(false)
            } else{
                toast.success("Notice Added Successfully!");
                setNoticeContent("")
                setNoticeHeading("")
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
        <div className="add-notice-whole-container">
            <AdminHeader />
                <ToastContainer 
                hideProgressBar={false}
                newestOnTop={true}
                autoClose={3000}
                position={"top-right"}
                />
                <div className="add-notice-outer-container">
                    <div className="add-notice-inner-container">Add Notice</div>
                </div>
                <div className="add-notice-form-container">
                    <form>
                        <label>Heading</label><br></br>
                        <input 
                        type="text"
                        onChange={handleChange}
                        value={noticeHeading}
                        ></input><br></br>
                        <label>Content</label><br></br>
                        <textarea 
                        onChange={handleChange1}
                        value={noticeContent}
                        ></textarea><br></br>
                        
                        <div onClick={onSubmit} className="add-notice-btn-inside">
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
                <div  className="go-back-add-notice-page"><span onClick={history.goBack}>Go Back</span></div>
            <AdminFooter />
        </div>
    )
}

export default AddNotice
