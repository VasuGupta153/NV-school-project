import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import "./Contact.css"
import AdminHeader from "../CoreComponents/Header/Header"
import AdminFooter from "../CoreComponents/Footer/Footer"
import Map from "./Map"
import { getContact } from "./helper/contactApis"
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminContact = () => {

    const [contact, setContact] = useState([])

    const preloadContact = () => {
        setLoader(true)
      getContact().then(data => {
            if(data.error){
                toast.error("Error Occured!")
                setLoader(false)
            } else{
                setContact(data)
                setLoader(false)
            }
        }) 
    }

    useEffect(() => {
        preloadContact()
    }, [])

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
            <ToastContainer 
            hideProgressBar={false}
            newestOnTop={true}
            autoClose={3000}
            position={"top-right"}
            />
            <div className="admin-contact-us-outer-container">
                <div className="admin-contact-us-inner-container">Contact Us</div>
                <Link style={{color: "white", textDecoration: "none"}} to={`/admin/contact/update/${process.env.REACT_APP_CONTACT_ID}`}><div className="update-contact-btn">Update Contact Details</div></Link>
            </div>
            <SyncLoader
            css={override}
            loading={loader}
            size={10}
            color="#B80924"
            /> 
            {!loader && <div className="contact-container">
                <div className="nv-recent-in-contact">N V Recent Public School</div>
                <div className="contact-address">{contact.address}</div>
                <div className="email-and-phone"><span>Email:-</span> <span>{contact.email}</span></div>
                <div className="email-and-phone"><span>Ph. no.:-</span> <span>{contact.phone}</span></div>
            </div>}
            
            <div className="map-heading-outer-container">
                <div className="map-heading-inner-container"><i class="fas fa-map-marker-alt"></i> Location On Map</div>
            </div>
            <div className="map-container">
                <Map/>
            </div>
            <AdminFooter />
        </div>
    )
}

export default AdminContact;