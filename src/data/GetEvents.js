import { gapi } from "gapi-script";
import mockData from "./dummyData.js";
const clientId = process.env.REACT_APP_CLIENT_ID;

export default function GetEvents(minTime, user) {
    //TODO : set minTime and MAx time to display event by month in 'nombreReseravtion'
    // minTime must be set from the first day of a month at midnight, same for maxTime
    //set the appropriate value in NombreReservation...
    if (minTime === "now") {
        minTime = new Date().toISOString();
    } else if (minTime === "all") {
        minTime = new Date("2022-08-01T12:25:01.871Z").toISOString(); //set  to the first time user began to use the app
    }
    return new Promise((resolve, reject) =>{
    if (user?.isLogged) {
            gapi.load("client:auth2", () => {
                gapi.client
                    .init({
                        clientId: clientId,
                        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
                        scope: "https://www.googleapis.com/auth/calendar",
                    })
                    .then(gapi.auth2.getAuthInstance())
                    .then(() => {
                        const request = {
                            calendarId: "primary",
                            timeMin: minTime,
                            showDeleted: false,
                            singleEvents: true,
                            maxResults: 350,
                            orderBy: "startTime",
                        };

                        gapi.client.calendar.events
                            .list(request)
                            .then((e) => {
                                resolve(e.result.items);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    });
            })
        } else {
            resolve(mockData.dummyEvents);
            console.log('mock data');
       }
        });
}
