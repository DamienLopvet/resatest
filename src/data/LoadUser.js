import { gapi } from "gapi-script";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";


const clientId = process.env.REACT_APP_CLIENT_ID;

export default function LoadUser() {
    const [error, setError] = useState("");
    const [userThumbnail, setUserThumbnail] = useState("");
    const [GoogleUser, setGoogleUser] = useState({});
    const [GoogleAuth, setGoogleAuth] = useState({});
    var GoogleAuthInstance;
    var userIsLoggedIn = false;
    
    function logOut() {
        if (window.confirm("Se déconnecter ?")) {
            GoogleUser.disconnect();
           setUserThumbnail(()=> "")
           console.log(userThumbnail);
        }
    }

    useEffect(() => {
        function handleClientLoad() {
            gapi.load("client:auth2", initClient);
        }

            function initClient(){
                gapi.client
                .init({
                    clientId: clientId,
                    discoveryDocs: [
                        "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
                    ],
                    scope: "https://www.googleapis.com/auth/calendar",
                })
                .then(() => {
                    GoogleAuthInstance = gapi.auth2.getAuthInstance();
                    userIsLoggedIn = gapi.auth2
                        .getAuthInstance()
                        .isSignedIn.get();
                    if (userIsLoggedIn) {
                        console.log("user is logged");
                        let User = GoogleAuthInstance.currentUser.get();
                        if (User) setGoogleUser(User);
                        let imageUrl = User.getBasicProfile().getImageUrl();
                        setUserThumbnail(() => imageUrl);
                        setGoogleAuth(() => GoogleAuthInstance);
                    } else {
                        console.log("user is not logged");
                        
                        gapi.signin2.render("divSignin", {
                            width: 40,
                            height: 40,
                            onsuccess: handleClientLoad
                        });
                    }
                });}
       handleClientLoad()
    }, [userThumbnail]);
    return {userThumbnail, GoogleUser, logOut}
}
