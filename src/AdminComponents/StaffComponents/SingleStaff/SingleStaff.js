import React, {useState, useEffect} from "react"
import "./SingleStaff.css"
import AdminHeader from "../../CoreComponents/Header/Header"
import AdminFooter from "../../CoreComponents/Footer/Footer"
import {getStaff} from "../helper/StaffApis"
import SyncLoader from "react-spinners/SyncLoader";


const AdminSingleStaff = ({match}) => {

    const [staff, setStaff] = useState({})
    
    const preload = (staffId) => {
        setLoader(true)
        getStaff(staffId).then(data => {
            if(data.err){
                console.log(data.err)
            } else{
                setStaff(data)
                setLoader(false)
            }
        })
    }

    useEffect(() => {
        preload(match.params.staffId);
    }, [match.params.staffId])

    // loader----------------------------------------------------------
    const [loader, setLoader] = useState(false)
    
    const override = `
    display: block;
    margin: 100px auto;
    text-align: center;
    border-color: red;
    `;

    return(
        <div>
            <AdminHeader />
            <SyncLoader
            css={override}
            loading={loader}
            size={10}
            color="#B80924"
            />
            {!loader && <div><div className="single-staff-header-container"> 
                <div className="single-staff-image-container">
                    <img src={`${staff.staffphotoURL}`} alt="Can't Load"></img>
                </div>
                <div>
                    <div className="single-staff-name">{staff.name}</div>
                    <div className="single-staff-description">{staff.description}</div>
                </div>
            </div>
            <div className="single-staff-content-container">{staff.content}</div></div>}
            
            <AdminFooter />
        </div>
    )
}

export default AdminSingleStaff;