import { gapi } from "gapi-script";
import React, { useContext } from "react";
import { UserContext } from "../UserContext.js" 
const clientId = process.env.REACT_APP_CLIENT_ID;

export default function LoadUser() {
   const { user, setUser } = useContext(UserContext) 
    var GoogleUser ={};
    var GoogleAuth ={};
    var GoogleAuthInstance;
    var userIsLoggedIn = false;
    
    function logOut() {
        if (window.confirm("Se déconnecter ?")) {
            gapi.auth2.getAuthInstance().currentUser.get().disconnect();
           document.location.reload();
           setUser("")
        }
    }

   
    function handleClientLoad() {
          
                gapi.load("client:auth2", () => {
                    gapi.client
                        .init({
                            clientId: clientId,
                            discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
                            scope: "https://www.googleapis.com/auth/calendar",
                        })
                        .then((e) => {
                            let user_ = {}
                            GoogleAuthInstance = gapi.auth2.getAuthInstance();
                            userIsLoggedIn = GoogleAuthInstance.isSignedIn.get();
                            user_.isLogged = userIsLoggedIn;
                            if (userIsLoggedIn) {
                                let User = GoogleAuthInstance.currentUser.get();
                                if (User) GoogleUser = User;
                                user_.thumbnail = User.getBasicProfile().getImageUrl()
                                setUser(user_);
                                //console.log(userThumbnail);
                                GoogleAuth= GoogleAuthInstance;
                            } else {
                               setUser("");
                                gapi.signin2.render("divSignin", {
                                    width: 40,
                                    height: 40,
                                    onsuccess: handleClientLoad,
                                });
                            }
                        });
                })
        
        }
    return {logOut, handleClientLoad}
}
