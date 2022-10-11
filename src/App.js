import "./App.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Ajouter from "./Ajouter";
import Modifier from "./Modifier";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";

const clientId = process.env.REACT_APP_CLIENT_ID;

export default function App() {

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
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
                                <Link to="/">Ajouter</Link>
                            </li>
                            <li>
                                <Link to="/Modifier">Modifier</Link>
                            </li>
                        </ul>
                    </nav>
                    <hr></hr>
                    <Routes>
                        <Route
                            path="/"
                            element={<Ajouter />}
                        />
                        <Route path="/Modifier" element={<Modifier />} />
                    </Routes>
                </div>
            </Router>
        </GoogleOAuthProvider>
    );
}
