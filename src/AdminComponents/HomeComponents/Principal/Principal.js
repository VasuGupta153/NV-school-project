import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom"
import "./Principal.css";
import {getPrincipal} from "./helper/PrincipalApis"
import { PRINCIPALID } from "../../../backend";
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Principal = () => {

    const [principal, setPrincipal] = useState("")

    const preloadPrincipal = () => {
        setLoader(true)
        getPrincipal().then(data => {
            if(data.error){
                toast.error("Error Occured!")
                setLoader(false)
            } else{
                setLoader(false)
                setPrincipal(data)
            }
        })
    }

    useEffect(() => {
        preloadPrincipal()
    }, [])
 
    const message = `${principal.content}`.substring(0,730);
    
    // loader----------------------------------------------------------
    const [loader, setLoader] = useState(false)
    
    const override = `
    display: block;
    margin: 100px auto;
    text-align: center;
    border-color: red;
    `;

    return(
        <div className="principal-container">
            <ToastContainer 
            hideProgressBar={false}
            newestOnTop={true}
            autoClose={3000}
            position={"top-right"}
            />
            <div className="admin-message-heading-outer-container">
                <div className="message-heading-container">
                            Message from our Principal
                </div>
                <Link style={{color: "white", textDecoration: "none"}} to={`/admin/principal/update/${PRINCIPALID}`}><div className="update-principal-btn-home-page">Update Details</div></Link>
            </div>
            <SyncLoader
            css={override}
            loading={loader}
            size={10}
            color="#B80924" 
            />
            {!loader && <div className="inner-principal-container">
                <div className="principal-image-container">
                    <img src={`${principal.principalphotoURL}`} alt="Can't Load"></img>
                    <div className="pradeep-singhal">Mr. Pradeep Singhal</div>
                    <div className="principal">Principal</div>
                </div>
                <div className="principal-message-container">
                    <div className="message-container">
                        {message}..... <Link to="/admin/principal"><span>Read More</span></Link> 
                    </div>
                </div>
            </div>}
            
        </div>
    )
}

export default Principal;