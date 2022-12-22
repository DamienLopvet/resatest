import { gapi } from 'gapi-script';
import React from 'react'
const clientId = process.env.REACT_APP_CLIENT_ID;

export default function DeleteEvent(prop) {

    gapi.load("client:auth2", () => {
        gapi.client.init({
            clientId: clientId,
            discoveryDocs: [
                "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
            ],
            scope: "https://www.googleapis.com/auth/calendar",
        
    })
        .then(gapi.auth2.getAuthInstance()).then(() => {
        let eventId = prop;
        console.log(eventId)

        var params = {
            calendarId: "primary",
            eventId: eventId,
        };
        let request = gapi.client.calendar.events.delete(params);
        request.execute();
        
    });
    
})
return console.log('event deleted')
}