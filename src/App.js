import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Ajouter from "./pages/Ajouter";
import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import Home from "./pages/Home";
import Reservations from "./pages/Reservations";
import Header from "./Header";
import Calendrier from "./pages/Calendrier";
import Transactions from "./pages/Transactions";
import GetEvents from "./data/GetEvents";


export default function App() {
    const [user, setUser] = useState({
        isLogged : false,
        thumbnail:null
    })
    const [error, setError] = useState("");
    const [eventId, setEventId] = useState("");
    const [events, setEvents] = useState([]);

    useEffect(() => {
        GetEvents('all').then((e)=> setEvents(e))
    }, []);
    
  
    return (
        
        <div>
                {error && <p className="response">{error}</p>}
                <UserContext.Provider value ={{ user, setUser }} >
                <Router>
                 <Header events = {events} />
                    <div id="actualComponent" className="pt-16">
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
    </UserContext.Provider>
            </div>
    );
}
