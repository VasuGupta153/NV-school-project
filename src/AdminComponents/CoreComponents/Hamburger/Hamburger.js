import React from "react"
import "./Hamburger.css"

const Hamburger = (props) => {

    

    return(
        <div onClick={props.clickMe} className="hamburger_container">
            <i  className="fas fa-bars hamburger"></i>
        </div>
    )
}

export default Hamburger;