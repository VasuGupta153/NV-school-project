import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import "./PrincipalPage.css"
import AdminHeader from "../CoreComponents/Header/Header"
import AdminFooter from "../CoreComponents/Footer/Footer"
import {getPrincipal} from "../../Components/HomeComponents/Principal/helper/PrincipalApis"
import SyncLoader from "react-spinners/SyncLoader";
import {PRINCIPALID} from "../../backend"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AdminPrincipalPage = () => {

    const [principal, setPrincipal] = useState("")

    const preloadPrincipal = () => {
        setLoader(true)
        getPrincipal().then(data => {
            if(data.error){
                toast.error("Error Occured!")
                setLoader(false)
            } else{
                setPrincipal(data)
                setLoader(false)
            }
        })
    }

    useEffect(() => {
        preloadPrincipal()
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
            <ToastContainer 
            hideProgressBar={false}
            newestOnTop={true}
            autoClose={3000}
            position={"top-right"}
            />
        <AdminHeader />
        <div className="admin-principal-page-heading-outer-container">
                <div className="admin-principal-page-heading-inner-container">
                    <h2>Message from our Principal</h2>
                </div>
                <Link style={{color: "white", textDecoration: "none"}} to={`/admin/principal/update/${PRINCIPALID}`}><div className="update-principal-btn">Update</div></Link>
        </div>
        <SyncLoader
            css={override}
            loading={loader}
            size={10}
            color="#B80924"
        />
        {!loader && <div className="principal-page-container">
            <div className="principal-page-image-container">
                <img src={`${principal.principalphotoURL}`} alt="Can't Load"></img>
            </div>
            <p>{principal.content}</p>
            <p id="principal">Mr. Pradeep Singhal</p>
            <p id="designation">Principal, N.V. Recent Public School</p>
        </div>}
        
        <AdminFooter />
        </div>
    )
}

export default AdminPrincipalPage; 