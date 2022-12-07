import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Ajouter from "./Ajouter";
import Modifier from "./Modifier";
import { useState } from "react";
import Home from "./Home";
import Reservations from "./Reservations";
import Header from "./Header";



export default function App() {
    const [error, setError] = useState("");
    const [eventId, setEventId] = useState("");
    
  
    return (
        <div className="App">
            {error && <p className="response">{error}</p>}
           
            <Router>
            <Header />
                <div>
                    {/* <nav>
                        {!userThumbnail && <div id="divSignin"></div>}
                        <ul>
                            <li>
                                <Link to="/resatest/">Home</Link>
                            </li>
                            <li>
                                <Link to="/resatest/modifier">Modifier</Link>
                            </li>
                        </ul>
                        <hr></hr>
                    </nav> */}
                    <Routes>
                        <Route
                            path="/resatest/nouvelle-reservation"
                            element={
                                <Ajouter
                                    eventId={eventId}
                                    setEventId={setEventId}
                                />
                            }
                        />

                        <Route
                            path="/resatest/"
                            element={
                                <Home
                                    eventId={eventId}
                                    setEventId={setEventId}
                                />
                            }
                        />
                        <Route
                            path="/resatest/modifier"
                            element={<Modifier setEventId={setEventId} />}
                        />
                        <Route
                            path="/resatest/reservations"
                            element={<Reservations />}
                        />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}
