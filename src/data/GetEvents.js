import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
const clientId = process.env.REACT_APP_CLIENT_ID;


export default function GetEvents(){
    
    var [eventList, setEventList] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        gapi.load("client:auth2", () => {
            gapi.client.init({
                clientId: clientId,
                discoveryDocs: [
                    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
                ],
                scope: "https://www.googleapis.com/auth/calendar",
            
        })
            .then(gapi.auth2.getAuthInstance())
            .then(() => {
                const request = {
                    calendarId: "primary",
                    //timeMin: new Date().toISOString(),
                    showDeleted: false,
                    singleEvents: true,
                    maxResults: 50,
                    orderBy: "startTime",
                };
            
                gapi.client.calendar.events
                    .list(request)
                    .then((e) => {
                        if (e.result.items.length === 0)
                        console.log(e.result.items);
                        setEventList(e.result.items);
                    })
                    .catch(() => {
                        setError("Une Erreur est survenue");
                        setTimeout(() => {
                            setError("");
                        }, "3000");
                    });
            });
        });
    }, []);
    return eventList
}