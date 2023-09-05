import React, {useState, useEffect} from 'react'
import "./UpdateNotice.css"
import AdminHeader from "../../CoreComponents/Header/Header"
import AdminFooter from "../../CoreComponents/Footer/Footer"
import {getNotice, updateNotice} from "../../HomeComponents/NoticeBoard/helper/NoticeBoardApis"
import {isAuthenticated} from "../../AuthComponents/helper/authapis"
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateNotice = ({match, history}) => {

    const [noticeHeading, setNoticeHeading] = useState(""); 
    const [noticeContent, setNoticeContent] = useState("");
    const [loader, setLoader] = useState(false)
    const [loader1, setLoader1] = useState(false)
    const {token} = isAuthenticated()

    const preload = (noticeId) => {
        setLoader(true)
        getNotice(noticeId).then(data => {
            if(data.err){
                setLoader(false)
                toast.error("Error Occured!")
            } else{
                setLoader(false)
                setNoticeHeading(data.noticeHeading);
                setNoticeContent(data.noticeContent);
            }
        })
    }

    useEffect(() => {
        preload(match.params.noticeId);
    }, [match.params.noticeId])

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
        setLoader1(true)
        updateNotice(match.params.noticeId, "ayush", token, {noticeHeading, noticeContent} )
        .then(data => {
            if(data.error){
                toast.error("Error Occured!");
                setLoader1(false)
            } else{
                toast.success("Notice Updated Successfully!");
                preload(match.params.noticeId);
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
                <div className="notice-update-outer-container">
                    <div className="notice-update-inner-container">Update Notice</div>
                </div>
                <SyncLoader
                css={override}
                loading={loader}
                size={10}
                color="#B80924"
                />
                {!loader && <div><div className="notice-update-form-container">
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
                        
                        <div onClick={onSubmit} className="update-notice-btn-inside"><SyncLoader
                        css={override1}
                        loading={loader1}
                        size={10}
                        color="white"
                        />{!loader1 && <span>Update</span>}</div> 
                    </form>
                </div>
                <div  className="go-back-update-notice-page"><span onClick={history.goBack}>Go Back</span></div></div>}
            <AdminFooter />
        </div>
    )
}

export default UpdateNotice
