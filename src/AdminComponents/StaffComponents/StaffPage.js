import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import "./StaffPage.css"
import "./StaffCard/StaffCard.css"
import AdminHeader from "../CoreComponents/Header/Header"
import AdminFooter from "../CoreComponents/Footer/Footer"
import {getAllStaff, deleteStaff} from "./helper/StaffApis"
import SyncLoader from "react-spinners/SyncLoader";
import Popup from "reactjs-popup";
import {isAuthenticated} from "../AuthComponents/helper/authapis"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminStaffPage = () => {

    const [staff, setStaff] = useState([])

    const preloadstaff = () => {
        setLoader(true)
        getAllStaff().then(data => {
            if(data.error){
                toast.error("Error Occured!")
                setLoader(false)
            } else{
                setStaff(data)
                setLoader(false)
            } 
        })
    }

    useEffect(() => {
        preloadstaff()
    }, [])

    // loader----------------------------------------------------------
    const [loader, setLoader] = useState(false)
    
    const override = `
    display: block;
    margin: 100px auto 350px;
    text-align: center;
    border-color: red;
    `;
    // Loader-----------------------------------
    const [loader1, setLoader1] = useState(false)

    const override1 = `
    display: block;
    margin: 0px auto;
    text-align: center;
    border-color: red;
    `;

    //Popup-------------------------------------------
    const [popup, setPopup] = useState(false)
    const [staffId, setStaffId] = useState("")

    const popupFunction = (id) => {
        setPopup(true)
        setStaffId(id)
    }

    //Delete image--------------------------------------
    const {token} = isAuthenticated()

    const deleteOnSubmit = (staffId) => {
        setLoader1(true)
        deleteStaff(staffId, "ayush", token)
        .then(data => {
            if(data.error){
                toast.error("Staff Not Deleted!");
                setLoader1(false)
                setPopup(false)
            } else{
                setLoader1(false)
                toast.success("Staff Deleted Successfully!");
                preloadstaff()
                setPopup(false)
            }
        })
    }

    return(
        <div>
            <AdminHeader />
            <ToastContainer 
            hideProgressBar={false}
            newestOnTop={true}
            autoClose={3000}
            position={"top-right"}
            />
                <Popup contentStyle={{width: "75%", padding: "50px 0px"}} modal open={popup}  onClose={()=>setPopup(false)}>
                    <div className="delete-confirmation">All Staff details will be Deleted?</div>
                    <SyncLoader
                    css={override1}
                    loading={loader1}
                    size={10}
                    color="#B80924"
                    />
                    {!loader1 && (
                    <div style={{display: "flex", justifyContent: "center"}}>
                    <div className="delete-btn" onClick={() => {deleteOnSubmit(staffId)}}>Delete</div>
                    <div className="cancel-btn" onClick={()=>setPopup(false)}>Cancel</div>
                    </div>
                    )}
                </Popup>
                <div className="admin-staff-heading-outer-container">
                    <div className="admin-staff-heading-inner-container"> 
                        <h2>Our School Staff</h2>
                    </div>
                    <Link style={{color: "white", textDecoration: "none"}} to="/admin/staffs/create"><div className="add-staff-btn">Add Staff</div></Link>
                </div>
                <SyncLoader
                css={override}
                loading={loader}
                size={10}
                color="#B80924"
                />
                {!loader && <div className="staff-container">
                    {staff.map((staff, index) => {
                        return(
                            <div className="staff-card">
                                <Link style={{color: "white", textDecoration: "none"}} to={`/admin/staff/${staff._id}`}>
                                    <div className="staff-photo-description-container">
                                        <img src={`${staff.staffphotoURL}`} alt="Can't Load"></img>
                                        <div className="staff-card-description">
                                            <div className="staff-name">{staff.name}</div>
                                            <div className="staff-description">{staff.description}</div>
                                        </div>
                                    </div>
                                </Link> 
                                <div className="staff-update-delete-btn-container">
                                <Link style={{color: "black", textDecoration: "none"}} to={`/admin/staff/update/${staff._id}`}><div id="update-btn-staff">Update</div></Link>
                                <div id="delete-btn-staff" onClick={()=>popupFunction(staff._id)}>Delete</div>
                                </div>
                            </div> 
                        )
                    })}
                </div>}
                
            <AdminFooter />
        </div>
    )
}

export default AdminStaffPage