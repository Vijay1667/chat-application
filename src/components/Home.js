import { doc } from "firebase/firestore";
import React, { useState } from "react";
// import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/dist/react-notifications.css'
import { useNavigate, useLocation } from "react-router-dom";
import Google_Logout from "./Google_Logout";

export default function Home_page() {
    const navigate = useNavigate();
    const location = useLocation();
    const arr = "123456789abcdefghijklmnopqrstuvwxyz"
    const [uname,setUname]=useState(location.state.user_gname)
    const [eemail,setEemail]=useState(location.state.email)
    console.log(location.state)
    function MyNavigate(event) {
        event.preventDefault()
        const uname=
        navigate(`/middle/${randomStr(12, arr)}` , { state: { user_gname: location.state.user_gname, email: location.state.email } })
        // navigate("/home", { state: { user_gname: location.state.given_name, email: location.state.email } })
    }
    function randomStr(len, arr) {
        var ans = '';
        for (var i = len; i > 0; i--) {
            ans +=
                arr[Math.floor(Math.random() * arr.length)];
        }
        return ans;
    }
    function JoinNavigate(event) {
        event.preventDefault();
        if( document.getElementById("create_room_id").value.length!=12){
           
            document.getElementById("create_room_id").value=""
            document.getElementById("create_room_id").setAttribute("placeholder","The id must be of length - 12 characters ")
            document.getElementById("create_room_id").setAttribute("class","form-control bg-warning");
            setTimeout(()=>{ document.getElementById("create_room_id").setAttribute("class","form-control");console.log("hello")},2000)
           
            
            
        }
        else{
            navigate("/middle/" + document.getElementById("create_room_id").value, { state: { user_gname: location.state.user_gname, email: location.state.email } })
        }
        
    }
    return (
        <div>
            <Google_Logout />
            <div className="container d-flex flex-column justify-content-center">
                <div>
                    <h2>Welcome {location.state.user_gname}</h2>
                </div>
                <div className="py-2">
                    <h4> Create a Room id</h4>

                    <form id="create_form" onSubmit={(event) => event.preventDefault()}>
                        {/* <input id="create_room_id" className="form-control" required /> */}
                        <button className="btn btn-primary" type="submit" onClick={MyNavigate} >Create</button>
                    </form>

                </div>
                <div className="py-2">
                    <h4> Join the room</h4>
                    <React.StrictMode>
                        <form id="join_form" onSubmit={JoinNavigate}>
                            <input id="create_room_id" className="form-control " required />
                            <button className="btn btn-primary my-2" type="submit" >Join</button>
                        </form>
                    </React.StrictMode>
                </div>
            </div>
            
        </div>
    )
}