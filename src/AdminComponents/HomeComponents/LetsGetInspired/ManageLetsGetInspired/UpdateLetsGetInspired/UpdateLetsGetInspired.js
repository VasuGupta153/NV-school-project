import React, {useState, useEffect} from 'react'
import "./UpdateLetsGetInspired.css"
import AdminHeader from "../../../../CoreComponents/Header/Header"
import AdminFooter from "../../../../CoreComponents/Footer/Footer"
import {updateLetsGetInspired, getLetsGetInspired} from "../../helper/LetGetInspiredApis"
import {isAuthenticated} from "../../../../AuthComponents/helper/authapis"
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateLetsGetInspired = ({match, history}) => {

    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const [loader, setLoader] = useState(false)
    const [loader1, setLoader1] = useState(false)
    const {token} = isAuthenticated()

    const preload = (letsgetinspiredId) => {
        setLoader(true)
        getLetsGetInspired(letsgetinspiredId).then(data => {
            if(data.err){
                toast.error("Error Occured!")
                setLoader(false)
            } else{
                setLoader(false)
                setQuote(data.quote);
                setAuthor(data.author);
            }
        })
    }

    useEffect(() => {
        preload(match.params.letsgetinspiredId);
    }, [match.params.letsgetinspiredId])

    const handleChange = event => {
        setQuote(event.target.value)
    }
    const handleChange1 = event => {
        setAuthor(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setLoader1(true)
        updateLetsGetInspired(match.params.letsgetinspiredId, "ayush", token, {quote, author} )
        .then(data => {
            if(data.error){
                toast.error("Error Occured!");
                setLoader1(false)
            } else{
                toast.success("Quote Updated Successfully!");
                preload(match.params.letsgetinspiredId);
                setLoader1(false)
            }
        })
    }

    const override = `
    display: block;
    margin: 100px auto 350px;
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
                <div className="quotes-update-outer-container">
                    <div className="quotes-update-inner-container">Manage Quotes</div>
                    
                </div>
                <SyncLoader
                css={override}
                loading={loader}
                size={10}
                color="#B80924"
                />
                {!loader && <div><div className="quote-update-form-container">
                    <form>
                        <label>Quote</label><br></br>
                        <textarea 
                        type="text"
                        onChange={handleChange}
                        value={quote}
                        ></textarea><br></br>
                        <label>Author</label><br></br>
                        <input type="text"
                        onChange={handleChange1}
                        value={author}
                        ></input><br></br>
                        
                        <div onClick={onSubmit} className="update-quote-btn-inside"><SyncLoader
                        css={override1}
                        loading={loader1}
                        size={10}
                        color="white"
                        />{!loader1 && <span>Update</span>}</div>  
                    </form>
                </div>
                <div  className="go-back-update-quote-page"><span onClick={history.goBack}>Go Back</span></div></div>}
                
            <AdminFooter />
        </div>
    )
}

export default UpdateLetsGetInspired
