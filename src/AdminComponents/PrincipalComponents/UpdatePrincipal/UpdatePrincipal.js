import React, {useState, useEffect} from 'react'
import "./UpdatePrincipal.css"
import AdminHeader from "../../CoreComponents/Header/Header"
import AdminFooter from "../../CoreComponents/Footer/Footer"
import {getPrincipal, updatePrincipal} from "../../HomeComponents/Principal/helper/PrincipalApis"
import {isAuthenticated} from "../../AuthComponents/helper/authapis"
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdatePrincipal = ({match, history}) => {

    const [principalphotoURL, setPrincipalphotoURL] = useState(""); 
    const [content, setContent] = useState("");
    const [loader, setLoader] = useState(false)
    const [loader1, setLoader1] = useState(false)
    const {token} = isAuthenticated() 

    const preload = (principalId) => {
        setLoader(true)
        getPrincipal(principalId).then(data => {
            if(data.err){
                setLoader(false)
                toast.error("Error Occured!")
            } else{
                setLoader(false)
                setPrincipalphotoURL(data.principalphotoURL);
                setContent(data.content);
            }
        })
    }

    useEffect(() => {
        preload(match.params.principalId);
    }, [match.params.principalId])

    const handleChange = event => {
        setPrincipalphotoURL(event.target.value)
    }
    const handleChange1 = event => {
        setContent(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if(principalphotoURL === "" || content === ""){
            toast.error("Input Can't Be Empty");
            return;
        }
        setLoader1(true)
        updatePrincipal(match.params.principalId, "ayush", token, {principalphotoURL, content} )
        .then(data => {
            if(data.error){
                toast.error("Error Occured!");
                setLoader1(false)
            } else{
                toast.success("Details Updated Successfully!");
                preload(match.params.principalId);
                setLoader1(false)
            }
        })
    }

    const override = `
    display: block;
    margin: 200px auto 300px;
    text-align: center;
    border-color: red;
    `;

    const override1 = `
    display: block;
    text-align: center;
    border-color: red;
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
                <div className="principal-update-outer-container">
                    <div className="principal-update-inner-container">Update Principal Details</div>
                </div>
                <SyncLoader
                css={override}
                loading={loader}
                size={10}
                color="#B80924"
                />
                {!loader && <div><div className="principal-update-form-container">
                    <form>
                        <label>Image Url</label><br></br>
                        <input 
                        type="text"
                        onChange={handleChange}
                        value={principalphotoURL}
                        ></input><br></br>
                        <label>Content</label><br></br>
                        <textarea
                        onChange={handleChange1}
                        value={content}
                        ></textarea><br></br>
                        
                        <div onClick={onSubmit} className="update-principal-btn-inside"><SyncLoader
                        css={override1}
                        loading={loader1}
                        size={10}
                        color="white"
                        />{!loader1 && <span>Update</span>}</div> 
                    </form>
                </div>
                <div  className="go-back-update-principal-page"><span onClick={history.goBack}>Go Back</span></div></div>}
            <AdminFooter />
        </div>
    )
}

export default UpdatePrincipal
