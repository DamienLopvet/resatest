import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Ajouter from "./pages/Ajouter";
import Modifier from "./Modifier";
import { useState } from "react";
import Home from "./pages/Home";
import Reservations from "./pages/Reservations";
import Header from "./Header";
import Calendrier from "./pages/Calendrier";
import Transactions from "./pages/Transactions";


export default function App() {
    const [error, setError] = useState("");
    const [eventId, setEventId] = useState("");
    
  
    return (
        <div className="App">
            {error && <p className="response">{error}</p>}
           
            <Router>
            <Header />
                <div>
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
                            path="/resatest/calendrier"
                            element={
                                <Calendrier/>
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
                         <Route
                            path="/resatest/transactions"
                            element={
                                <Transactions />
                            }
                        />
                    </Routes>
                       
                </div>
            </Router>
        </div>
    );
}
