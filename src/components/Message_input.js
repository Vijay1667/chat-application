import React, { createRef, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Message from "./Message";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from '@react-oauth/google';
import { useLocation, useParams } from "react-router-dom";
import { db } from "./firebase_config";
import { collection, getDocs, addDoc, doc, onSnapshot, serverTimestamp, orderBy } from 'firebase/firestore'
import { ref, query, orderByChild, getDatabase, get } from "firebase/database";
import { Navigate, useNavigate, Redirect, useNavigation } from "react-router-dom";
import Google_Logout from "./Google_Logout";
import Status from "./Status";
function Message_input(props) {

    var [disablebutton, setDisablebutton] = React.useState(true);

    var [number, setNumber] = React.useState([]);
    var [present_message, setPresent_message] = React.useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    // console.log(location.state.user_gname)
    // for input focus 

    const inputRef = useRef();
    const inputRef2 = document.getElementsByClassName("scrolling_bottom_act");
    const [user_gname, setUser_gname] = React.useState(location.state.user_gname);
    const [user_email, setUser_email] = React.useState(location.state.email);
    console.log(params)
    ////////////////////////
    const userCollectionref = collection(db, params.id)

    useEffect(() => {



        JoinedStatus()


        inputRef.current.focus();
        const db2 = getDatabase()
        const get_messages = query(userCollectionref, orderBy("createdAt", "asc"))
        onSnapshot(get_messages, (snapshot) => {
            console.log(snapshot.docs)
            setNumber(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))

        })


        // onSnapshot(userCollectionref, (snapshot) => {
        //     console.log(snapshot.docs);

        //     setNumber(snapshot.docs.sort((a, b) => a['createdAt'] - (b['createdAt'])).map((doc) => ({ ...doc.data() })))
        // })
        // const getUsers = async () => {
        //     const data = await getDocs(userCollectionref);
        //     console.log(data)
        //     console.log(data.docs)
        //     let new_arr = number.slice();
        //     setNumber(data.docs.map((doc)=>({...doc.data()})))
        // }

        // getUsers()
    }, [])
    const JoinedStatus = async () => {
        if (localStorage.getItem(user_gname) === null) {
            localStorage.setItem(user_gname, new Date().toLocaleTimeString('it-IT').substring(0, 5))
            await addDoc(userCollectionref, { user: user_gname, email: user_email, liked: false, time: new Date().toLocaleTimeString('it-IT').substring(0, 5), createdAt: serverTimestamp(), date: (new Date()).toString().substring(0, 15), status: "joinedAt" })
        }
        else {
            
        }


    }

    function disable_button(event) {

        if (event.target.value == "") {
            setDisablebutton(true)
        }
        else {
            setDisablebutton(false)
            present_message = event.target.value;
        }
    }
    function sendMessage() {
        let new_arr = number.slice();
        const data = {
            message: present_message,
            time: new Date().toLocaleTimeString('it-IT').substring(0, 5)
        }
        new_arr.push(data);
        setNumber(new_arr)
        document.getElementById("present_message").value = ""

    }
    const addMessage = async () => {
        const this_message = document.getElementById("present_message").value
        document.getElementById("present_message").value = ""
        setDisablebutton(true)
        await addDoc(userCollectionref, { user: user_gname, message: this_message, email: user_email, liked: false, time: new Date().toLocaleTimeString('it-IT').substring(0, 5), createdAt: serverTimestamp(), date: (new Date()).toString().substring(0, 15) })

        // inputRef2.scrollIntoView();
    }


    console.log(user_email + "::" + location.state.email)
    return (
        <div className="container-fluid">
            {/* <Google_Logout/> */}
            <Google_Logout room_id={params.id} user_gname={location.state.user_gname} email={location.state.email} />
            <div style={{ backgroundImage: 'url("")', backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundAttachment: "fixed" }}>
                <div className="p-1 mb-5" >
                    <div className=" mb-4" id="all_messages">
                        {/* <Message message_content={"This is: me"} />  */}
                        {console.log(number)}
                        {/* <Status user={user_gname} time={new Date().toLocaleTimeString('it-IT').substring(0, 5)}/> */}
                        {number.map((ele, index) => {
                            // console.log(ele.email + "::" + user_email)
                            if (ele.status == "joinedAt") {
                                { console.log(ele) }
                                return (
                                    <Status key={index} email={ele.email}  user={ele.user} time={ele.time} />
                                )
                            }
                            else if (ele.email == user_email) {
                                return (

                                    <Message position="d-flex flex-row justify-content-end" key={index} sameuser={true} email={ele.email} likedm={ele.liked} dbsid={params.id} msgid={ele.id} username={ele.user} message_content={ele.message} time={ele.date + " " + ele.time} />

                                )
                            }   
                            else {
                                return (

                                    <Message position="d-flex flex-row justify-content-start" key={index} likedm={ele.liked} dbsid={params.id} msgid={ele.id} username={ele.user} message_content={ele.message} time={ele.date + " " + ele.time} />

                                )
                            }

                        })}


                    </div>
                    <div className="scrolling_bottom_act"></div>
                    <React.StrictMode style={{ backgroundColor: "white" }}>
                        <form onSubmit={(event) => event.preventDefault()} className="mt-auto d-flex flex-row fixed-bottom position-fixed  p-3" style={{ backgroundColor: "white" }}>
                            <input ref={inputRef} style={{ borderRadius: 20 }} placeholder="Enter your message" onChange={disable_button} id="present_message" className="form-control"></input>
                            <button type="submit" style={{ backgroundColor: "#fff" }} onClick={addMessage} className="btn btn-light mx-2" disabled={disablebutton}><img src="https://img.icons8.com/material/30/null/sent--v1.png" /></button>
                        </form>
                    </React.StrictMode>
                </div>
            </div>
        </div >
    )
}

export default Message_input