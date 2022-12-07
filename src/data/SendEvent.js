import { gapi } from "gapi-script";

const clientId = process.env.REACT_APP_CLIENT_ID;

export default function SendEvent(payload) {
return new Promise((resolve, reject) => gapi.load("client:auth2", () => {
        gapi.client
            .init({
                clientId: clientId,
                discoveryDocs: [
                    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
                ],
                scope: "https://www.googleapis.com/auth/calendar",
            })
            .then(gapi.auth2.getAuthInstance())
            .then(() => {
                let event = payload;
                var request = gapi.client.calendar.events.insert({
                    calendarId: "primary",
                    resource: event,
                    sendUpdates: "all",
                    // authorization: "bearer" + token
                });
                request.execute(function (event) {
                   resolve(event);
                    
                })
            })
    }));

}
