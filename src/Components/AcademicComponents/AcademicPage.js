import React, {useState, useEffect} from "react"
import "./AcademicPage.css"
import Header from "../../CoreComponents/Header/Header"
import Footer from "../../CoreComponents/Footer/Footer"
import {getAcademic} from "./helper/AcademicApis"
import parse from "html-react-parser"
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AcademicPage = () => {

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
            <Header />
            <ToastContainer 
            hideProgressBar={false}
            newestOnTop={true}
            autoClose={3000}
            position={"top-right"}
            />
                <div className="academic-outer-container">
                    <div className="academic-inner-container">Academic</div>
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
            <Footer />
        </div>
    )
}

export default AcademicPage;