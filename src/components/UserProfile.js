import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
export default function UserProfile(props){
    return(
        <div style={{zIndex:10,backgroundColor:"silver",color:"white"}} className="p-2 rounded-3 mx-1">
            <div className="text-center text-light ">
                Vijay Narayan Reddy
            </div>
            <div className="text-center text-light h6">
            <a className="text-light" href="mailto:reddyvijay1667@gmail.com">reddyvijay1667@gmail.com</a>
            
                
            </div>
        </div>
    )
}