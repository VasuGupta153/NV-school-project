import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./NoticeBoard.css";
import {getallNotices} from "./helper/NoticeBoardApis"
import ModalWindow from "../../NoticeComponents/ModalWindow"
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NoticeBoard = () => {

    const [notices, setNotices] = useState([])

    const preloadNotices = () => {
        setLoader(true)
      getallNotices().then(data => {
            if(data.error){
                toast.error("Error Occured!")
                setLoader(false)
            } else{
                setLoader(false)
                setNotices(data)
            }
        })
    }

    useEffect(() => {
        preloadNotices()
    }, [])

    var i = 4;

    // Modal Window ------------------------------------------
    const [isOpen, setIsOpen] = useState(false);
    const [index, setIndex] = useState("")
    const [notice, setNotice] = useState("")

    const showModal = (contact, index) => {
        setNotice(contact);
        setIndex(index);
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
        setNotice("");
        setIndex("");
    };

    // ---------------------------------------------------------
    const [loader, setLoader] = useState(false)
    
    const override = `
    display: block;
    margin: 50px auto;
    text-align: center;
    border-color: red;
    `;
    return(
        <div className="notice-board-container">
            <ToastContainer 
            hideProgressBar={false}
            newestOnTop={true}
            autoClose={3000}
            position={"top-right"}
            />
            <ModalWindow key={index} notice = {notice} isOpen={isOpen} hideModal={hideModal}/>
            <div className="notice-header">
                <h2>Notice Board</h2> 
                <i className="fas fa-chevron-right"></i>
            </div>
            <SyncLoader
                    css={override}
                    loading={loader}
                    size={10}
                    color="#B80924"
                    />
            <div className="notices-outer-container">
                <div className="notices-container">
                        {notices.map((notice, index) => {
                            i++;
                            if(i<=10){
                                return(
                                    <div key={index} className="home-notice-container">
                                        <div>{notice.date}</div>
                                        <div onClick={()=>showModal(notice, index)}>{notice.noticeHeading}</div>
                                    </div>
                                )
                            }  else{return(null)}
                        })}
                </div>
            </div>
            <div className="view-all">
                <span><Link to="/notices">View all</Link></span>
            </div>
        </div>
    )
}

export default NoticeBoard;