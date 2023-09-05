import React from "react"
import "./StaffCard.css"
import { Link } from "react-router-dom"

const StaffCard = (props) => {
    return(
        <div className="staff-card">
            <Link style={{color: "white", textDecoration: "none"}} to={`/staff/${props.staff._id}`}>
                <div className="staff-photo-description-container">
                    <img src={`${props.staff.staffphotoURL}`} alt="Can't Load"></img>
                    <div className="staff-card-description">
                        <div className="staff-name">{props.staff.name}</div>
                        <div className="staff-description">{props.staff.description}</div>
                    </div>
                </div>
            </Link>
        </div>
    )     
}

export default StaffCard;