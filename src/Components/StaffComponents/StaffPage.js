import React, {useState, useEffect} from "react"
import "./StaffPage.css"
import Header from "../../CoreComponents/Header/Header"
import Footer from "../../CoreComponents/Footer/Footer"
import StaffCard from "./StaffCard/StaffCard"
import {getAllStaff} from "./helper/StaffApis"
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StaffPage = () => {

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

    return(
        <div>
            <Header />
            <ToastContainer 
            hideProgressBar={false}
            newestOnTop={true}
            autoClose={3000}
            position={"top-right"}
            />
                <div className="staff-heading-outer-container">
                    <div className="staff-heading-inner-container"> 
                        <h2>Our School Staff</h2>
                    </div>
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
                            <StaffCard key={index} staff={staff}/>
                        )
                    })}
                </div>}
                
            <Footer />
        </div>
    )
}

export default StaffPage