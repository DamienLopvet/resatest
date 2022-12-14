import "./App.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Ajouter from "./Ajouter";
import Modifier from "./Modifier";
import { gapi } from "gapi-script";
import { useEffect, useState } from "react";

const clientId = process.env.REACT_APP_CLIENT_ID;
export default function App() {
    const [error, setError] = useState("");
    const [eventId, setEventId] = useState('')
    const [userThumbnail, setUserThumbnail] = useState("");
    const [GoogleUser, setGoogleUser] = useState({});
    useEffect(() => {
        var GoogleAuth;

        function handleClientLoad() {
          gapi.load("client:auth2", initClient)
        }
        function initClient() {
            gapi.client
                .init({
                    clientId: clientId,
                    discoveryDocs: [
                        "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
                    ],
                    scope: "https://www.googleapis.com/auth/calendar",
                })
                .then(() => {
                    GoogleAuth = gapi.auth2.getAuthInstance();
                    let userIsLoggedIn = GoogleAuth.isSignedIn.get();
                    if (userIsLoggedIn) {
                        console.log("user is logged");
                        let User = GoogleAuth.currentUser.get();
                        if (User) setGoogleUser(User);
                        let imageUrl = User.getBasicProfile().getImageUrl();
                        setUserThumbnail(() => imageUrl);
                    } else {
                        console.log("user is not logged");
                        setError('Utilisateur non connnecté');
                setTimeout(()=>{ 
                setError('')}, "3000") 
            
                        gapi.signin2.render("divSignin", {
                            width: 40,
                            height: 40,
                            onsuccess: handleClientLoad,
                        });
                    }
                })
        }

        handleClientLoad();
    }, [userThumbnail]);

    function logOut() {
        if (window.confirm("Se déconnecter ?")) {
            setGoogleUser({});
            setUserThumbnail("");
            GoogleUser.disconnect();
        }
    }
    return (
        <div className="App">
            {error && <p className="response">{error}</p>}

            {userThumbnail && (
                <div id="user_logo">
                    <img src={userThumbnail} onClick={logOut} alt="lamades" />
                </div>
            )}
            <Router>
                <div>
                    <nav>
            {!userThumbnail && <div id="divSignin"></div>}
                        <ul>
                            <li>
                                <Link to="/resatest/">Ajouter</Link>
                            </li>
                            <li>
                                <Link to="/resatest/Modifier">Modifier</Link>
                            </li>
                        </ul>
                    <hr></hr>
                    </nav>
                    <Routes>
                        <Route path="/resatest/" element={<Ajouter eventId={eventId} setEventId={setEventId} />} />
                        <Route
                            path="/resatest/Modifier"
                            element={<Modifier setEventId={setEventId}/>}
                        />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}
