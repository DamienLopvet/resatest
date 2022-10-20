import "./App.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Ajouter from "./Ajouter";
import Modifier from "./Modifier";
import { gapi } from "gapi-script";
import { useEffect, useState } from "react";

const clientId = process.env.REACT_APP_CLIENT_ID;
export default function App() {
    const [eventId, setEventId] = useState('')
    const [userThumbnail, setUserThumbnail] = useState("");
    const [GoogleUser, setGoogleUser] = useState({});
    useEffect(() => {
        var GoogleAuth;

        function handleClientLoad() {
            gapi.load("client:auth2", initClient);
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

                        gapi.signin2.render("divSignin", {
                            width: 30,
                            height: 30,
                            onsuccess: handleClientLoad,
                        });
                    }
                });
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
            {!userThumbnail && <div id="divSignin"></div>}

            {userThumbnail && (
                <div id="user_logo">
                    <img src={userThumbnail} onClick={logOut} alt="lamades" />
                </div>
            )}
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/resatest/">Ajouter</Link>
                            </li>
                            <li>
                                <Link to="/resatest/Modifier">Modifier</Link>
                            </li>
                        </ul>
                    </nav>
                    <hr></hr>
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
