import React, { useState } from "react";
import "./App.css";
import { gapi } from "gapi-script";

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const clientId = process.env.REACT_APP_CLIENT_ID;

export default function Modifier() {
    const [response , setResponse] = useState('')
    const [error, setError] =useState('')
   const [eventList, setEventList] = useState([]);
    const loadGapi = () => {
        gapi.load("client", () => {
            gapi.client
                .init({
                    apiKey:apiKey,
                    discoveryDocs: [
                        "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
                    ],
                    clientId: clientId,
                    scope: "https://www.googleapis.com/auth/calendar",
                })
                .then(() => {
                    gapi.client.load("calendar", "v3", () => {
                        console.log("client ready");
                    });
                }).catch((err)=>console.log(err));
        });
    };
    loadGapi()

    const getEvents = (e) => {
        gapi.auth2.getAuthInstance().then(() => {
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
                setEventList(e.result.items);
                setResponse(e.status)
                if(e.error)setError(e.error.message)
            });
        });
    };
    function deleteEvent(event) {
        gapi.auth2.getAuthInstance().then(() => {
   
     let eventId = event.target.value
        
      var params = {
        calendarId: 'primary',
        eventId: eventId,
      };

      let request = gapi.client.calendar.events.delete(params)
      request.execute(function(response) {
        if(response.error || response === false){
            alert('Error');
        }
        else{
            setEventList((arr) => arr.filter((e) => e.id !== eventId))              
        }
    });
        })
        
    }
    const updateEvent = (event)=>{
        console.log(event.target.value);

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
                            <button onClick={updateEvent} value={item.id}>Modifier</button>
                            <button onClick={deleteEvent } value={item.id}>Supprimer</button>

                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
