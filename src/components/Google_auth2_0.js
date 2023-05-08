import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';


import jwtDecode from "jwt-decode";
import { Navigate, useNavigate, Redirect, useNavigation } from "react-router-dom";
import { db } from "./firebase_config";
import { collection, getDocs, addDoc, doc, onSnapshot, serverTimestamp, orderBy } from 'firebase/firestore'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Message_input from "./Message_input";

import 'bootstrap/dist/css/bootstrap.min.css';
export default function GoogleAuth2({ props, navigation }) {
    const [name, setName] = useState("");
    const [login_success, setLogin_success] = useState(true);
    const navigate = useNavigate();
    // const navigate = useNavigation();
    const userdbref = collection(db, "user logins")
    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{height:"100vh"}}>

            <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log()
                    const data = jwtDecode(credentialResponse.credential)
                    console.log(credentialResponse);
                    setName(data.given_name)
                    setLogin_success(false)
                    console.log(jwtDecode(credentialResponse.credential))
                    { <Routes> <Route path="chat" element={<Message_input user_gname={data.given_name} />}></Route></Routes> }
                    const add_user_db = async () => {
                        console.log("Adding")
                        await addDoc(userdbref, { user: data.given_name, email: data.email, time: new Date().toLocaleTimeString('it-IT').substring(0, 5), loginAt: serverTimestamp() })
                    }
                    add_user_db()

                    // {<Navigate replace to="/chat" user_gname={data.given_name  }/>}

                    // navigate("/chat", { state: { user_gname: data.given_name, email: data.email } })
                    navigate("/home", { state: { user_gname: data.given_name, email: data.email } })
                    // < Redirect to = {{ pathname: "/chat",  state: {user_gname: data.given_name }}}/>

                }}
                onError={() => {
                    console.log('Login Failed');
                    navigate("/")
                }}
                useOneTap
                auto_select="true"

            />

            {/* <button className="btn btn-outline-primary" onClick={() => {
                googleLogout()
                setName("")
                setLogin_success(true)
            }}>Logout</button> */}
            <p hidden={login_success}>Welcome {name}</p>

        </div>
    )
}