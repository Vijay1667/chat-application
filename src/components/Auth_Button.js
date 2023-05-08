import React from "react";
import GoogleButton from 'react-google-button'
import 'bootstrap/dist/css/bootstrap.min.css';
import ScriptTag from 'react-script-tag';
export default function Authbutton() {
    function handle_error(){
        console.log("Error catched")
    }
    return (
        <div className="d-flex justify-content-center">
            <ScriptTag src="https://accounts.google.com/gsi/client" />
            <GoogleButton onClick={() => { console.log("Clicked") }} />
            <div id="g_id_onload"
                data-client_id="3466374083-mdtdo3jtjho9c0qjq9tvbmdts52rseht.apps.googleusercontent.com"
                data-context="signin"
                data-ux_mode="popup"
                data-callback="handle_error"
                data-auto_prompt="false">
            </div>

            <div class="g_id_signin"
                data-type="standard"
                data-shape="rectangular"
                data-theme="outline"
                data-text="signin_with"
                data-size="large"
                data-logo_alignment="left">
            </div>
        </div>
    )
}