import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { fr } from "date-fns/locale";
import "./App.css";
import { gapi } from "gapi-script";

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const clientId = process.env.REACT_APP_CLIENT_ID;

export default function Modifier() {
  const sendEvent = () => {
    gapi.load("client", (e) => {
        console.log("gapi loaded");
    });
    gapi.client.init({
        apiKey: apiKey,
        discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
        ],
        clientId: clientId,
        scope: "https://www.googleapis.com/auth/calendar",
    });
    gapi.client.load("calendar", "v3", () => {
        console.log("client loaded");
    });

    gapi.auth2.getAuthInstance().then(() => {
            console.log("auth instance !");
            const request = {
                calendarId: "primary",
                timeMin: new Date().toISOString(),
                showDeleted: false,
                singleEvents: true,
                maxResults: 10,
                orderBy: "startTime",
            };

            gapi.client.calendar.events.list(request).then((e)=>{console.log(e.result.items);});
        });
};
  return (
    <button onClick={sendEvent}>test</button>

  )
}
