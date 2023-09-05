import React, {useState, useEffect} from "react"
import "./SingleStaff.css"
import Header from "../../../CoreComponents/Header/Header"
import Footer from "../../../CoreComponents/Footer/Footer"
import {getStaff} from "../helper/StaffApis"
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SingleStaff = ({match}) => {

    const [staff, setStaff] = useState({})
    
    const preload = (staffId) => {
        setLoader(true)
        getStaff(staffId).then(data => {
            if(data.err){
                toast.error("Error Occured!")
                setLoader(false)
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
    margin: 100px auto 420px;
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
            
            <Footer />
        </div>
    )
}

export default SingleStaff;