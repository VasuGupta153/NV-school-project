import React, {useState, useEffect} from "react"
import "./AdmissionPage.css"
import Header from "../../CoreComponents/Header/Header"
import Footer from "../../CoreComponents/Footer/Footer"
import {getAdmission} from "./helper/AdmissionApis"
import parse from "html-react-parser"
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdmissionPage = () => {

    const [admission, setAdmission] = useState("")

    const preloadAdmission = () => {
        setLoader(true)
        getAdmission().then(data => {
            if(data.error){
                setLoader(false)
                toast.error("Error Occured!")
            } else{
                setLoader(false)
                setAdmission(data)
            }
        })
    }

    useEffect(() => {
        preloadAdmission()
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
                <div className="admission-outer-container">
                    <div className="admission-inner-container">Admission</div>
                </div>
                <SyncLoader
                css={override}
                loading={loader}
                size={10}
                color="#B80924"
                />
                {!loader && <div>
                {admission.content && 
                    <div className="admission-body-container">
                    {parse(`${admission.content}`)}
                </div>
                }
                </div>}
            <Footer />
        </div>
    )
}

export default AdmissionPage;