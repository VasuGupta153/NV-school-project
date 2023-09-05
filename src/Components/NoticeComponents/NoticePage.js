import React, {useState, useEffect} from "react"
import "./NoticePage.css"
import Header from "../../CoreComponents/Header/Header"
import Footer from "../../CoreComponents/Footer/Footer"
import {getallNotices} from "../HomeComponents/NoticeBoard/helper/NoticeBoardApis"
import ModalWindow from "./ModalWindow"
import Pagination from "./Pagination/Pagination"
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NoticePage = () => {

    const [notices, setNotices] = useState([]) 

    const preloadNotices = () => {
        setLoader(true)
        getallNotices().then(data => {
            if(data.error){
                toast.error("Error Occured!")
                setLoader(false)
            } else{
                setNotices(data)
                setLoader(false)
            }
        })
    }
 
    useEffect(() => {
        preloadNotices()
    }, [])

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

    // Pagination-----------------------------------------------
    const showPerPage = 8;
    const [pagination, setPagination] = useState({
      start: 0,
      end: showPerPage,
    });
  
    const onPaginationChange = (start, end) => {
      setPagination({ start: start, end: end });
    };

    // loader----------------------------------------------------------
    const [loader, setLoader] = useState(false)
    
    const override = `
    display: block;
    margin: 100px auto 300px;
    text-align: center;
    border-color: red;
    `;

    return(
        <div>
            <Header />
            <ToastContainer 
            hideProgressBar={false}
            newestOnTop={true}
            autoClose={3000}
            position={"top-right"}
            />
            <ModalWindow key={index} notice = {notice} isOpen={isOpen} hideModal={hideModal}/>
                
                <div className="notice-outer-container">
                    <div className="notice-inner-container">
                        Notices
                    </div>
                </div>
                <div className="loader">
                    <SyncLoader
                    css={override}
                    loading={loader}
                    size={10}
                    color="#B80924"
                    />
                </div>
                <div className="all-notices-container">
                    {notices.slice(pagination.start, pagination.end).map((notice, index) => {
                        return(
                            <div key={index} onClick={()=>showModal(notice, index)} className="notice-container">
                                <div className="notice-heading-content-container" title="Click To View Notice">
                                    <div className="notice-heading">{notice.noticeHeading}</div>
                                    <div className="notice-content">{`${notice.noticeContent}`.substring(0, 30)}...</div>
                                </div>
                                <div className="notice-date">{notice.date}</div>
                            </div>
                        )
                    })}
                </div>
                <Pagination
                showPerPage={showPerPage}
                onPaginationChange={onPaginationChange}
                total={notices.length}
                />
            <Footer />
        </div>
    )
}

export default NoticePage