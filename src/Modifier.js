import React, { useState } from "react";
import "./App.css";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";


export default function Modifier({setEventId} ) {
    const navigate = useNavigate()
    const GoogleAuth = gapi.auth2?.getAuthInstance()
    const [response, setResponse] = useState("");
    const [error, setError] = useState("");
    const [eventList, setEventList] = useState([]);

    function getEvents(e) {
        e.preventDefault();

        GoogleAuth.then(() => {
            console.log("auth instance !");
            const request = {
                calendarId: "primary",
                timeMin: new Date().toISOString(),
                showDeleted: false,
                singleEvents: true,
                maxResults: 50,
                orderBy: "startTime",
                
            };

            gapi.client.calendar.events.list(request).then((e) => {
                console.log(e.result.items);
                setEventList(e.result.items);
                setResponse(e.status);
                if (e.error) setError(e.error.message);
            });
        });
    }

    function deleteEvent(event) {
        GoogleAuth.then(() => {
            let eventId = event.target.value;

            var params = {
                calendarId: "primary",
                eventId: eventId,
            };

            let request = gapi.client.calendar.events.delete(params);
            request.execute(function (response) {
                if (response.error || response === false) {
                    alert("Error");
                } else {
                    setEventList((arr) => arr.filter((e) => e.id !== eventId));
                }
            });
        });
    }
    function modify(e) {
        let itemId = e.target.value
        console.log(itemId);
        setEventId(itemId);
        navigate('/resatest/')
        

    }
 
    return (
        <>
            <button onClick={getEvents}>test</button>
            {response && <p>{response}</p>}
            {error && <p>{error}</p>}
            <div>
                {!eventList.length && <p>Pas d'évenement prévu !</p>}
                <ul>
                    {eventList.map((item, i) => (
                        <li key={item.id}>
                            <p>{item.description}</p>
                            <p>{item.start.dateTime}</p>
                            <p>{item.end.dateTime}</p>
                            <p>{item.summary}</p>
                            <p>couleur : {item.colorId}</p>
                            
                            <button onClick={modify} value={item.id}>Modifier</button>
                            
                            <button onClick={deleteEvent} value={item.id}>
                                Supprimer
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
