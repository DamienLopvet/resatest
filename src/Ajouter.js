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

export default function Ajouter({ token }) {
    const [value, setValue] = useState(new Date(Date.now()));
    const [nbrPersons, setNbrPersons] = useState(0);
    const handleChange = (event) => {
        setNbrPersons(event.target.value);
    };
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
        <>
            <form>
                <fieldset>
                    <legend>Dates</legend>
                    <LocalizationProvider
                        locale={fr}
                        dateAdapter={AdapterDateFns}
                    >
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="Date d'arrivée"
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider
                        locale={fr}
                        dateAdapter={AdapterDateFns}
                    >
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="Date de départ"
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                        />
                    </LocalizationProvider>
                </fieldset>
                <label htmlFor="NombrePersonne">
                    <p>
                        <span className="nbrPers">{nbrPersons}</span>{" "}
                        personne(s)
                    </p>
                    <input
                        type="range"
                        min="1"
                        max="20"
                        id="NombrePersonne"
                        name="Nombre de personne"
                        value={nbrPersons}
                        onChange={handleChange}
                    />
                </label>
                <fieldset>
                    <legend>Client</legend>
                    <label htmlFor="Nom">
                        <input
                            type="text"
                            placeholder="Nom"
                            id="Nom"
                            name="Nom"
                        />
                    </label>
                    <label htmlFor="Prenom">
                        <input
                            type="text"
                            placeholder="Prenom"
                            id="Prénom"
                            name="Prenom"
                        />
                    </label>

                    <label htmlFor="Tel">
                        <input
                            type="tel"
                            placeholder="Téléphone"
                            id="Tel"
                            name="Tel"
                        />
                    </label>

                    <label htmlFor="Email">
                        <input
                            type="email"
                            placeholder="E-mail"
                            id="Email"
                            name="Email"
                        />
                    </label>
                </fieldset>
                <fieldset>
                    <legend>Chambre(s)</legend>
                    <label htmlFor="Chambre1">
                        <div id="Room1" className="rooms">
                            <input
                                type="checkbox"
                                id="Chambre1"
                                name="Chambre1"
                                value="Chambre1"
                            />
                        </div>
                    </label>
                    <label htmlFor="Chambre2">
                        <div id="Room2" className="rooms">
                            <input
                                type="checkbox"
                                id="Chambre2"
                                name="Chambre2"
                                value="Chambre2"
                            />
                        </div>
                    </label>
                    <label htmlFor="Chambre3">
                        <div id="Room3" className="rooms">
                            <input
                                type="checkbox"
                                id="Chambre3"
                                name="Chambre3"
                                value="Chambre3"
                            />
                        </div>
                    </label>
                    <label htmlFor="Chambre4">
                        <div id="Room4" className="rooms">
                            <input
                                type="checkbox"
                                id="Chambre4"
                                name="Chambre4"
                                value="Chambre4"
                            />
                        </div>
                    </label>
                    <label htmlFor="Chambre5">
                        <div id="Room5" className="rooms">
                            <input
                                type="checkbox"
                                id="Chambre5"
                                name="Chambre5"
                                value="Chambre5"
                            />
                        </div>
                    </label>
                    <label htmlFor="Chambre6">
                        <div id="Room6" className="rooms">
                            <input
                                type="checkbox"
                                id="Chambre6"
                                name="Chambre6"
                                value="Chambre6"
                            />
                        </div>
                    </label>
                    <label htmlFor="Chambre7">
                        <div id="Room7" className="rooms">
                            <input
                                type="checkbox"
                                id="Chambre7"
                                name="Chambre7"
                                value="Chambre7"
                            />
                        </div>
                    </label>
                    <label htmlFor="Chambre8">
                        <div id="Room8" className="rooms">
                            <input
                                type="checkbox"
                                id="Chambre8"
                                name="Chambre8"
                                value="Chambre8"
                            />
                        </div>
                    </label>
                </fieldset>
                <label htmlFor="sendToDB">
                    <input type="checkbox" id="sendToDB" name="sendToDB" />
                    Ajouter au fichier client
                </label>
                <div>
                    <input type="submit" value="Envoyer" />
                </div>
            </form>
        </>
    );
}
