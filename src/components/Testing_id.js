import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate,useLocation } from "react-router-dom";
import Google_Logout from "./Google_Logout";
export default function Testing_id(props) {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(params)
    console.log(location.state)
    return (
        <div>
            <Google_Logout room_id={params.id} user_gname={location.state.user_gname} email={location.state.email}/>
            
            <div className="container" style={{ fontSize: "20px" }}>
                This is testing
            </div>
        </div>
    )
}