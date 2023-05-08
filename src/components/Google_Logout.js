import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import 'react-notifications/dist/react-notifications.css'
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from '@react-oauth/google';
import { NotificationContainer, NotificationManager } from 'react-notifications';
export default function Google_Logout(props) {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(props.user_gname)
    function Exit_Room() {
        NotificationManager.info(props.user_gname + " left the room")
        localStorage.removeItem(props.user_gname);
        navigate("/home", { state: { user_gname: props.user_gname, email: props.email } })
    }
    return (
        <div>
            <div className="p-2 d-flex flex-row justify-content-between fixed-top position-sticky" style={{ backgroundColor: "white" }} >
                
                {props.room_id ? <div>
                    <span className="h5 px-2">Room_id: {props.room_id}</span>
                    <button className="btn btn-outline-primary " onClick={Exit_Room}>Exit <img src="https://img.icons8.com/ios/25/000000/fire-exit.png" /></button>
                    
                </div>
                    :   <></>}
                <div>
                    <button className="btn btn-outline-primary" onClick={() => {
                        googleLogout()
                        navigate("/")
                    }}>Logout <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                            <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                        </svg></button>
                        <NotificationContainer />    
                </div>
                
            </div>
        </div>
    )
}