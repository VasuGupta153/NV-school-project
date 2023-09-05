import React, {useState} from 'react'
import "./LoginPage.css"
import Header from "../../CoreComponents/Header/Header"
import Footer from "../../CoreComponents/Footer/Footer"
import {signin, isAuthenticated, authenticate} from "./helper/authapis"
import {Redirect} from "react-router-dom"
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginPage({history}) {

    const [eyeClass, setEyeClass] = useState("fas fa-eye-slash")
    const [passwordType, setPasswordType] = useState("password")

    const toggleClass = () => {
        if(eyeClass === "fas fa-eye-slash"){
            setEyeClass("fas fa-eye")
            setPasswordType("text")
        } else{
            setEyeClass("fas fa-eye-slash")
            setPasswordType("password")
        }
    }

    // Authentication-----------------------------------
    const [values, setValues] = useState({
        email: "",
        password: "",
        loader: false,
        error: false,
        didRedirect: false
    })

    const {email, password, loader, error, didRedirect} = values;
    const {user} = isAuthenticated()

    const handleChange = name => event => {
        setValues({...values, error:false, [name]: event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault()
        setValues({...values, error: false, loader: true})
        signin({email, password})
        .then(data => {
          if(data.errors || data.error){
            setValues({...values, error: data.errors || data.error, loader: false})
          } else{
            authenticate(data, () => {
              setValues({
                ...values,
                didRedirect: true
              })
            })
          }
        }) 
        .catch(err => console.log(err));
      }

      const performRedirect = () => {
        if(didRedirect){
          if(user){
            return <Redirect to="/admin" />
          }else{
            return <Redirect to="/" />
          }
        }
      }
    

      const errorMessage = () => {
          if(error){
            toast.error("Email and Password does not Match");
          }
      }

      // loader----------------------------------------------------------
    
    const override = `
    display: block;
    margin: auto;
    text-align: center;
    border-color: red;
    `;

    //alert---------------------------------------
    


    return (
        <div className="login-page-background">
            <Header />
            <ToastContainer 
            hideProgressBar={false}
            newestOnTop={true}
            autoClose={3000}
            position={"top-right"}
            />
                {errorMessage()}
                {performRedirect()}
                <div className="login-form-container">
                <SyncLoader
                css={override}
                loading={loader}
                size={10}
                color="white"
                />
                    <form>
                        <label>Email Address</label><br></br>
                        <input 
                        type="email"
                        name="email"
                        onChange={handleChange("email")}
                        required></input><br></br>
                        <label>Password</label><br></br>
                        <input 
                        type={passwordType} 
                        name="password"
                        onChange={handleChange("password")}
                        maxLength="30" 
                        required></input>
                        <i className={eyeClass} onClick={toggleClass} id="togglePassword"></i><br></br>
                        <SyncLoader
                        css={override}
                        loading={loader}
                        size={10}
                        color="#B80924"
                        />
                        {!loader && <input type="submit" onClick={onSubmit} value="Log In"></input>}
                        
                    </form>
                </div>
                <div onClick={history.goBack} className="go-back">Go Back</div>
            <Footer />
        </div>
    )
}

export default LoginPage
