import React, {useState, useEffect} from 'react'
import "./UpdateContact.css"
import AdminHeader from "../../CoreComponents/Header/Header"
import AdminFooter from "../../CoreComponents/Footer/Footer"
import {updateContact, getContact} from "../helper/contactApis"
import {isAuthenticated} from "../../AuthComponents/helper/authapis"
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateContact = ({match, history}) => {

    const [email, setEmail] = useState(""); 
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [loader, setLoader] = useState(false)
    const [loader1, setLoader1] = useState(false)
    const {token} = isAuthenticated()

    const preload = () => {
        setLoader(true)
        getContact().then(data => {
            if(data.err){
                setLoader(false)
                toast.error("Error Occured!")
            } else{
                setLoader(false)
                setEmail(data.email);
                setPhone(data.phone);
                setAddress(data.address);
            }
        })
    }

    useEffect(() => {
        preload();
    }, [])

    const handleChange = event => {
        setEmail(event.target.value)
    }
    const handleChange1 = event => {
        setPhone(event.target.value)
    }
    const handleChange2 = event => {
        setAddress(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if(email === "" || phone === "" || address === ""){
            toast.error("Input Can't Be Empty");
            return;
        }
        setLoader1(true)
        updateContact("ayush", token, {email, phone, address} )
        .then(data => {
            if(data.error){
                toast.error("Error Occured!");
                setLoader1(false)
            } else{
                toast.success("Contact Details Updated Successfully!");
                preload();
                setLoader1(false)
            }
        })
    }

    const override = `
    display: block;
    margin: 150px auto 300px;
    text-align: center;
    border-color: red;
    `;

    const override1 = `
    display: block;
    text-align: center;
    border-color: white;
    `;

    return (
        <div style={{backgroundColor: "#e9eff3"}}>
            <AdminHeader />
                <ToastContainer 
                hideProgressBar={false}
                newestOnTop={true}
                autoClose={3000}
                position={"top-right"}
                />
                <div className="contact-update-outer-container">
                    <div className="contact-update-inner-container">Update Contact Details</div>
                </div>
                <SyncLoader
                css={override}
                loading={loader}
                size={10}
                color="#B80924"
                />
                {!loader && <div><div className="contact-update-form-container">
                    <form>
                        <label>Email</label><br></br>
                        <input 
                        type="email"
                        onChange={handleChange}
                        value={email}
                        ></input><br></br>
                        <label>Phone</label><br></br>
                        <input 
                        type="text"
                        onChange={handleChange1}
                        value={phone}
                        ></input><br></br>
                        <label>Address</label><br></br>
                        <textarea
                        onChange={handleChange2}
                        value={address}
                        ></textarea><br></br>
                        
                        <div onClick={onSubmit} className="update-contact-btn-inside"><SyncLoader
                        css={override1}
                        loading={loader1}
                        size={10}
                        color="white"
                        />{!loader1 && <span>Update</span>}</div>  
                    </form>
                </div>
                <div  className="go-back-update-contact-page"><span onClick={history.goBack}>Go Back</span></div></div>}
            <AdminFooter />
        </div>
    )
}

export default UpdateContact
