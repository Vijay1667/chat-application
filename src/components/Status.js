import React from "react";
import '../styles/status_font.css'

import 'bootstrap/dist/css/bootstrap.min.css';
export default function Status(props){
    return(
        <div>
            <div className="container rounded-4 text-center bg-light text-dark p-1 px-3 my-1" style={{fontFamily:"Noto Sans",width:"fit-content"}}>
                <abbr title={props.email} style={{textDecoration:"none"}}><u> {props.user}</u></abbr> joined the room at {props.time}
            </div>
        </div>
    )
}