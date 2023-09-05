import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import "./AboutUsPage.css"
import AdminHeader from "../CoreComponents/Header/Header"
import AdminFooter from "../CoreComponents/Footer/Footer"
import {getAbout} from "./helper/AboutApis"
import parse from "html-react-parser"
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminAboutUsPage = () => {

    const [about, setAbout] = useState("")

    const preloadAbout = () => {
        setLoader(true)
        getAbout().then(data => {
            if(data.error){
                setLoader(false)
                toast.error("Error Occured!")
            } else{
                setLoader(false)
                setAbout(data)
            }
        })
    }

    useEffect(() => {
        preloadAbout()
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
            <AdminHeader />
            <ToastContainer 
            hideProgressBar={false}
            newestOnTop={true}
            autoClose={3000}
            position={"top-right"}
            />
                <div className="admin-about-outer-container">
                    <div className="admin-about-inner-container">About</div>
                    <Link style={{color: "white", textDecoration: "none"}} to="/admin/about/update"><div className="update-about-btn">Update</div></Link>
                </div>
                <SyncLoader
                css={override}
                loading={loader}
                size={10}
                color="#B80924"
                />
                {!loader && <div>
                {about.content && 
                    <div className="about-body-container">
                    {parse(`${about.content}`)}
                </div>
                }
                </div>}
            <AdminFooter />
        </div>
    )
}

export default AdminAboutUsPage;