import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Ajouter from "./pages/Ajouter";
import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import Home from "./pages/Home";
import Reservations from "./pages/Reservations";
import Header from "./Header";
import Calendrier from "./pages/Calendrier";
import GetEvents from "./data/GetEvents";
import CarnetAdress from "./pages/CarnetAdress";
import parsedNotes from "./data/Notes";
import Notes from "./pages/Notes";

export default function App() {
    const [notes, setNotes] = useState([]);
    const [user, setUser] = useState({
        isLogged: false,
        thumbnail: null,
    });
    const [error, setError] = useState("");
    const [eventId, setEventId] = useState("");
    const [events, setEvents] = useState([]);
    console.log(user);

    useEffect(() => {
        GetEvents("all").then((e) => setEvents(e));
        let notes_ = parsedNotes();
        if (notes_?.length)
            setNotes(() => {
                return [...notes_];
            });
    }, []);

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    return (
        <div>
            {error && <p className="response">{error}</p>}
            <UserContext.Provider value={{ user, setUser }}>
                <Router>
                    <Header events={events} notes={notes} />
                    <div id="actualComponent" className="pt-16">
                        <Routes>
                            <Route exact path="/resatest/" element={<Home notes={notes} />} />
                            <Route path="/resatest/nouvelle-reservation" element={<Ajouter eventId={eventId} setEventId={setEventId} />} />

                            <Route path="/resatest/calendrier" element={<Calendrier />} />
                            <Route path="/resatest/reservations" element={<Reservations />} />
                            <Route path="/resatest/carnet-d-adresses" element={<CarnetAdress />} />
                            <Route path="/resatest/Notes" element={<Notes notes={notes} setNotes={setNotes} />} />
                            <Route path="*" component={Home} />
                        </Routes>
                    </div>
                </Router>
            </UserContext.Provider>
        </div>
    );
}
