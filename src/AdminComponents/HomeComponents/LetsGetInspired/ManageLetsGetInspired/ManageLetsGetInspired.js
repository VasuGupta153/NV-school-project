import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import "./ManageLetsGetInspired.css"
import AdminHeader from "../../../CoreComponents/Header/Header"
import AdminFooter from "../../../CoreComponents/Footer/Footer"
import {getallLetsGetInspired, deleteQuote} from "../helper/LetGetInspiredApis"
import SyncLoader from "react-spinners/SyncLoader";
import Popup from "reactjs-popup";
import {isAuthenticated} from "../../../AuthComponents/helper/authapis"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageLetsGetInspired = () => {

    const [letsGetInspired, setLetsGetInspired] = useState([])

    const preloadLetsGetInspired = () => {
      setLoader(true)
      getallLetsGetInspired().then(data => {
            if(data.error){
                toast.error("Error Occured!")
                setLoader(false)
            } else{
              setLetsGetInspired(data)
              setLoader(false)
            }
        })
    }

    useEffect(() => {
      preloadLetsGetInspired()
    }, [])

    
  // Loader-----------------------------------
  const [loader, setLoader] = useState(false)
  const [loader1, setLoader1] = useState(false)
    
  const override = `
  display: block;
  margin: 100px auto 350px;
  text-align: center;
  border-color: red;
  `;
  const override1 = `
  display: block;
  margin: 0px auto;
  text-align: center;
  border-color: red;
  `;

  //Popup-------------------------------------------
  const [popup, setPopup] = useState(false)
  const [quoteId, setQuoteId] = useState("")

    const popupFunction = (id) => {
        setPopup(true)
        setQuoteId(id)
    }

    //Delete Quote--------------------------------------
    const {token} = isAuthenticated()

    const deleteOnSubmit = (id) => {
        setLoader1(true)
        deleteQuote(id, "ayush", token)
        .then(data => {
            if(data.error){
                toast.error("Quote Not Deleted!");
                setPopup(false)
                setLoader1(false)
            } else{
                setLoader1(false)
                toast.success("Quote Deleted Successfully!");
                preloadLetsGetInspired()
                setPopup(false)
            }
        })
    }

    return (
        <div>
            <AdminHeader />
                <ToastContainer 
                hideProgressBar={false}
                newestOnTop={true}
                autoClose={3000}
                position={"top-right"}
                />
                <Popup contentStyle={{width: "75%", padding: "50px 0px"}} modal open={popup}  onClose={()=>setPopup(false)}>
                    <div className="delete-confirmation">Are you sure you want to Delete?</div>
                    <SyncLoader
                    css={override1}
                    loading={loader1}
                    size={10}
                    color="#B80924"
                    />
                    {!loader1 && (
                    <div style={{display: "flex", justifyContent: "center"}}>
                    <div className="delete-btn" onClick={() => {deleteOnSubmit(quoteId)}}>Delete</div>
                    <div className="cancel-btn" onClick={()=>setPopup(false)}>Cancel</div>
                    </div>
                    )}
                </Popup>
                <div className="quotes-outer-container">
                    <div className="quotes-inner-container">Manage Quotes</div>
                    <Link style={{color: "white", textDecoration: "none"}} to="/admin/letsgetinspired/create"><div className="add-quote-btn">Add Quote</div></Link>
                </div>
                <SyncLoader 
                    css={override}
                    loading={loader}
                    size={10}
                    color="#B80924"
                />
                {!loader && <div className="quote-author-outermost-container">
                {letsGetInspired.map((letsGetInspired, index) => {
                return(
                    <div key={index} className="quote-author-container">
                        <div className="quote"><em>{letsGetInspired.quote}</em></div>
                        <div className="author"><strong>-{letsGetInspired.author}</strong></div>
                        <div style={{display: "flex"}}>
                        <Link style={{color: "white", textDecoration: "none"}} to={`/admin/letsgetinspired/update/${letsGetInspired._id}`}><div className="quote-update">Update</div></Link>
                            <div onClick={()=>popupFunction(letsGetInspired._id)} className="quote-delete">Delete</div>
                        </div>
                    </div>
                )
                })}
                </div>}
            <AdminFooter />
        </div>
    )
}

export default ManageLetsGetInspired
