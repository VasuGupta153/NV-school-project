import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import "./NoticePage.css"
import AdminHeader from "../CoreComponents/Header/Header"
import AdminFooter from "../CoreComponents/Footer/Footer"
import {getallNotices, deleteNotice} from "../HomeComponents/NoticeBoard/helper/NoticeBoardApis"
import ModalWindow from "./ModalWindow"
import Pagination from "./Pagination/Pagination"
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Popup from "reactjs-popup";
import {isAuthenticated} from "../AuthComponents/helper/authapis"

const AdminNoticePage = () => {

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


    //Popup-------------------------------------------
    const [popup, setPopup] = useState(false)
    const [noticeId, setNoticeId] = useState("")

    const popupFunction = (id) => {
        setPopup(true)
        setNoticeId(id)
    }

        //Delete Notice--------------------------------------
        const {token} = isAuthenticated()

        const deleteOnSubmit = (id) => {
            setLoader1(true)
            deleteNotice(id, "ayush", token)
            .then(data => {
                if(data.error){
                    toast.error("Notice Not Deleted!");
                    setLoader1(false)
                    setPopup(false)
                } else{
                    setLoader1(false)
                    toast.success("Notice Deleted Successfully!");
                    preloadNotices()
                    setPopup(false)
                }
            })
        }

    // loader----------------------------------------------------------
    const [loader, setLoader] = useState(false)
    
    const override = `
    display: block;
    margin: 100px auto 300px;
    text-align: center;
    border-color: red;
    `;

    const [loader1, setLoader1] = useState(false)

    const override1 = `
    display: block;
    margin: 0px auto;
    text-align: center;
    border-color: red;
    `;

    return(
        <div>
            <AdminHeader />
            <ToastContainer 
            hideProgressBar={false}
            newestOnTop={true}
            autoClose={3000}
            position={"top-right"}
            />
            <ModalWindow key={index} notice = {notice} isOpen={isOpen} hideModal={hideModal}/>
            <Popup contentStyle={{width: "75%", padding: "50px 0px"}} modal open={popup}  onClose={()=>setPopup(false)}>
                    <div className="delete-confirmation">Are you sure you want to Delete?</div>
                    <SyncLoader
                    css={override1}
                    loading={loader1}
                    size={10}
                    color="#B80924"
                    />
                    {!loader1 && (
                    <div style={{display: "flex", justifyContent: "center"}}>
                    <div className="delete-btn" onClick={() => {deleteOnSubmit(noticeId)}}>Delete</div>
                    <div className="cancel-btn" onClick={()=>setPopup(false)}>Cancel</div>
                    </div>
                    )}
                </Popup>
                <div className="admin-notice-outer-container">
                    <div className="notice-inner-container">
                        Notices
                    </div>
                    <Link style={{color: "white", textDecoration: "none"}} to="/admin/notice/create"><div className="add-notice-btn">Add Notice</div></Link>
                </div>
                    <SyncLoader
                    css={override}
                    loading={loader}
                    size={10}
                    color="#B80924"
                    />
                    {!loader && <div className="all-notices-container">
                    {notices.slice(pagination.start, pagination.end).map((notice, index) => {
                        return(<div>
                            <div key={index} onClick={()=>showModal(notice, index)} className="notice-container-admin">
                                <div className="notice-heading-content-container" title="Click To View Notice">
                                    <div className="notice-heading">{notice.noticeHeading}</div>
                                    <div className="notice-content">{`${notice.noticeContent}`.substring(0, 30)}...</div>
                                </div>
                                <div className="notice-date">{notice.date}</div>
                            </div>
                            <div style={{display: "flex", marginBottom: "20px"}}>
                            <Link style={{color: "white", textDecoration: "none"}} to={`/admin/notice/update/${notice._id}`}><div className="notice-update-btn">Update</div></Link>
                            <div onClick={()=>popupFunction(notice._id)} className="notice-delete-btn">Delete</div>
                        </div>
                        </div>
                        )
                    })} 
                </div>}
                
                <Pagination 
                showPerPage={showPerPage}
                onPaginationChange={onPaginationChange}
                total={notices.length}
                />
            <AdminFooter />
        </div>
    )
}

export default AdminNoticePage