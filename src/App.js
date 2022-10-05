import "./App.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Ajouter from "./Ajouter";
import Modifier from "./Modifier";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";

const clientId = process.env.REACT_APP_CLIENT_ID;

export default function App() {
    const [token, setToken] = useState("");

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                    setToken(credentialResponse.credential);
                }}
                onError={() => {
                    console.log("Login Failed");
                }}
                useOneTap
                type="icon"
            />

            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/Ajouter">Ajouter</Link>
                            </li>
                            <li>
                                <Link to="/Modifier">Modifier</Link>
                            </li>
                        </ul>
                    </nav>
                    <hr></hr>
                    <Routes>
                        <Route
                            path="/Ajouter"
                            element={<Ajouter token={token} />}
                        />
                        <Route path="/Modifier" element={<Modifier />} />
                    </Routes>
                </div>
            </Router>
        </GoogleOAuthProvider>
    );
}
