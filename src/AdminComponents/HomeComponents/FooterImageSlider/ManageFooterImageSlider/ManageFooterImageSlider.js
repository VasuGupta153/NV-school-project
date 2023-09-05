import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import "./ManageFooterImageSlider.css"
import AdminHeader from '../../../CoreComponents/Header/Header'
import AdminFooter from "../../../CoreComponents/Footer/Footer"
import {getallFooterPhotos, deleteFooterPhoto} from "../helper/FooterImageSliderApis" 
import SyncLoader from "react-spinners/SyncLoader";
import Popup from "reactjs-popup";
import {isAuthenticated} from "../../../AuthComponents/helper/authapis"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageFooterImageSlider = () => {

    const [footerPhotos, setFooterPhotos] = useState([])

    const preloadFooterPhotos = () => {
      setLoader(true)
      getallFooterPhotos().then(data => {
            if(data.error){
                toast.error("Error Occured!")
                setLoader(false)
            } else{
              setFooterPhotos(data)
              setLoader(false)
            }
        })
    }

    useEffect(() => {
        preloadFooterPhotos()
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
  const [imageId, setImageId] = useState("")

    const popupFunction = (id) => {
        setPopup(true)
        setImageId(id)
    }

    //Delete image--------------------------------------
    const {token} = isAuthenticated()

    const deleteOnSubmit = (id) => {
        setLoader1(true)
        deleteFooterPhoto(id, "ayush", token)
        .then(data => {
            if(data.error){
                setLoader1(false)
                toast.error("Photo Not Deleted!");
            } else{
                setLoader1(false)
                toast.success("Photo Deleted Successfully!");
                preloadFooterPhotos()
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
                    <div className="delete-btn" onClick={() => {deleteOnSubmit(imageId)}}>Delete</div>
                    <div className="cancel-btn" onClick={()=>setPopup(false)}>Cancel</div>
                    </div>
                    )}
                </Popup>
                <div className="manage-footer-slider-outer-container">
                        <div className="manage-footer-slider-inner-container">Manage Gallery Slider Photos</div>
                        <Link style={{textDecoration: "none", color: "white"}} to="/admin/managefootersliderphotos/addphoto"><div className="footer-add-photo-btn">Add Photo</div></Link>
                </div>
            <SyncLoader
                    css={override}
                    loading={loader}
                    size={10}
                    color="#B80924"
            />
            {!loader && <div className="image-slider-photos-container">
                {footerPhotos.map((image, index) => {
                    return(
                        <div key={index} className="each-photo-container">
                            <img src={image.footerphotoURL} alt="Can't Load"></img>
                            <div onClick={()=>popupFunction(image._id)}><i className="far fa-trash-alt"></i></div>
                        </div>
                    )
                })}
            </div>}
            
            <AdminFooter />
        </div>
    )
}

export default ManageFooterImageSlider
