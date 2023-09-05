import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import "./AcademicPage.css"
import AdminHeader from "../CoreComponents/Header/Header"
import AdminFooter from "../CoreComponents/Footer/Footer"
import {getAcademic} from "./helper/AcademicApis"
import parse from "html-react-parser"
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminAcademicPage = () => {

    const [academic, setAcademic] = useState("")

    const preloadAcademic = () => {
        setLoader(true)
        getAcademic().then(data => {
            if(data.error){
                setLoader(false)
                toast.error("Error Occured!")
            } else{
                setLoader(false)
                setAcademic(data)
            }
        })
    }

    useEffect(() => {
        preloadAcademic()
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
                <div className="admin-academic-outer-container">
                    <div className="admin-academic-inner-container">Academic</div>
                    <Link style={{color: "white", textDecoration: "none"}} to="/admin/academic/update"><div className="update-academic-btn">Update</div></Link>
                </div>
                <SyncLoader
                css={override}
                loading={loader}
                size={10}
                color="#B80924"
                />
                {!loader && <div>
                {academic.content && 
                    <div className="academic-body-container">
                    {parse(`${academic.content}`)}
                </div>
                }
                </div>}
            <AdminFooter />
        </div>
    )
}

export default AdminAcademicPage;