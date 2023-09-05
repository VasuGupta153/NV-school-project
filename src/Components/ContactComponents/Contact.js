import React, {useState, useEffect} from "react"
import "./Contact.css"
import Header from "../../CoreComponents/Header/Header"
import Footer from "../../CoreComponents/Footer/Footer"
import Map from "./Map"
import { getContact } from "./helper/contactApis"
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {

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
    margin: 100px 100px;
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
            <div className="contact-us-outer-container">
                <div className="contact-us-inner-container">Contact Us</div>
                <SyncLoader
            css={override}
            loading={loader}
            size={10}
            color="#B80924"
            />
            </div>
            
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
            <Footer />
        </div>
    )
}

export default Contact;