import React, { useEffect, useState } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from "./firebase_config";
import { collection, getDocs, addDoc, doc, onSnapshot, serverTimestamp, orderBy, updateDoc, deleteDoc } from 'firebase/firestore'
import { ref, query, orderByChild, getDatabase, get, update } from "firebase/database";
export default function Message(props) {
    
    const docref=doc(db,props.dbsid,props.msgid)
    const [date, setDate] = React.useState(new Date())
    const [cursorPointer,setCursorPointer]=React.useState("crosshair");
    const [likedbutt,setLikedbutt]=React.useState(props.likedm);
    const [showlikedbutton,setShowlikedbutton]=React.useState("hidden");
    const [rightcontext,setRightcontext]=useState(false);
    const [xcontext,setXcontext]=useState(0);
    const [ycontext,setYcontext]=useState(0);
    // console.log(props.likedm)
    
    
    const message_time = {
        fontSize: "10px"
    }
    function changeMousePointer(event){
        setCursorPointer("pointer")
        // event.changeMousePointer("pointer")
    }
    function likeButton(event){
        if(likedbutt){
            
            
            setLikedbutt(false)
            updateDoc(docref,{liked:false})
            // console.log(likedbutt)
        }
        else{
            
            setLikedbutt(true)
            updateDoc(docref,{liked:true})
            // console.log(likedbutt)
        }
        
        
    }
    function showUser(){

    }
    function clickContext(event){
        event.preventDefault();
        setRightcontext(false);
        setXcontext(event.pageX);
        setYcontext(event.pageY);
        setRightcontext(true);
    }
    function hideContext(event){
        setRightcontext(false)
    }
    window.addEventListener("click",()=>{
        if(rightcontext){
            setRightcontext(false);
        }
        
    })
    return (
        <div style={{top:xcontext,left:ycontext}} onClick={hideContext} onContextMenu={clickContext} onMouseOver={()=>{setShowlikedbutton("visible")}} onMouseLeave={()=>{setShowlikedbutton("hidden")}}  className={` ${props.position}`}>
            {/* <UserProfile/> */}
            {props.sameuser && rightcontext && (
                <div  className="contextMenu rounded-1 mx-3">
                    <div className="p-1 px-1 m-1 rounded-1 menuElement" onClick={async()=>{console.log("Doc deleted::");
                await deleteDoc(docref)}}> 🗑 Delete Message</div>
                <div className="p-1 px-1 m-1 rounded-1 menuElement">Edit</div>
                

                </div>

            )}
            {/* <button className="btn"   style={{border:"none",visibility:showlikedbutton}} onClick={likeButton}><img id="likebuttonimg" src={likedbutt?"https://img.icons8.com/ios-glyphs/15/null/facebook-like--v1.png":"https://img.icons8.com/external-kmg-design-detailed-outline-kmg-design/15/null/external-like-feedback-kmg-design-detailed-outline-kmg-design.png"}/></button> */}
            <div className={` rounded-3 pt-1 px-2 pb-1 mb-1 one_message  bg-dark text-light `} style={{ height: "fit-content", maxWidth: "70%",width:"fit-content" }}>
                
                <a title={props.email} onMouseOver={changeMousePointer} onClick={showUser} className=" message_username text-warning text-end  px-1" style={{fontSize:"13px",cursor:cursorPointer}}>
                    
                    {props.username}
                </a>
                <div className="message_text text-end px-1" style={{fontSize:"15px"}}> 
                    {props.message_content}
                </div>
                <div className="message_time text-end text-secondary px-1" style={{fontSize:"x-small"}}>
                    {props.time}
                </div>
            </div>
        </div>
    )
}