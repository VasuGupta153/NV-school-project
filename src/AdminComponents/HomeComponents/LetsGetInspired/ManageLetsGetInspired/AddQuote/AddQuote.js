import React, {useState} from 'react'
import "./AddQuote.css"
import AdminHeader from "../../../../CoreComponents/Header/Header"
import AdminFooter from "../../../../CoreComponents/Footer/Footer"
import {createLetsGetInspired} from "../../helper/LetGetInspiredApis" 
import {isAuthenticated} from "../../../../AuthComponents/helper/authapis"
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddQuote= ({history}) => { 
    
    const [quote, setQuote] = useState("")
    const [author, setAuthor] = useState("")
    const [loader, setLoader] = useState(false)

    const {token} = isAuthenticated() 

    const handleChange = event => {
        setQuote(event.target.value)
    }
    const handleChange1 = event => {
        setAuthor(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if(quote === "" || author === ""){
            toast.error("Input Can't Be Empty");
            return;
        }
        setLoader(true)
        createLetsGetInspired("ayush", token, {quote, author})
        .then(data => {
            if(data.error){
                toast.error("Error Occured!");
                setLoader(false)
            } else{
                toast.success("Added Successfully!");
                setQuote("")
                setAuthor("")
                setLoader(false)
            }
        })
    }

    const override = `
    display: block;
    text-align: center;
    border-color: red;
    `;

    return (
        <div className="add-quote-whole-container">
            <AdminHeader />
                <ToastContainer 
                hideProgressBar={false}
                newestOnTop={true}
                autoClose={3000}
                position={"top-right"}
                />
                <div className="quotes-outer-container">
                    <div className="quotes-inner-container">Manage Quotes</div>
                </div>
                <div className="add-quote-form-container">
                    <form>
                        <label>Quote</label><br></br>
                        <textarea 
                        type="text"
                        onChange={handleChange}
                        value={quote}
                        ></textarea><br></br>
                        <label>Author</label><br></br>
                        <input 
                        type="text"
                        onChange={handleChange1}
                        value={author}
                        ></input><br></br>
                        
                        <div onClick={onSubmit} className="add-quote-btn-inside">
                        <SyncLoader
                        css={override}
                        loading={loader}
                        size={10}
                        color="white"
                        />
                                {!loader && <span>Add Quote</span>}
                        </div>
                    </form>
                </div>
                <div  className="go-back-add-quote-page"><span onClick={history.goBack}>Go Back</span></div>
            <AdminFooter />
        </div>
    )
}

export default AddQuote
