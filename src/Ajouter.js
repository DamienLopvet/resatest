import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { fr } from "date-fns/locale";
import "./App.css";
import { gapi } from "gapi-script";
import Modifier from "./Modifier";


export default function Ajouter({ eventId, setEventId }) {
    const [loading, setLoading] = useState(false);
    const [eventToModify, setEventToModify] = useState("");
    const [submitValue, setSubmitValue] = useState("Envoyer");
    const GoogleAuth = gapi.auth2?.getAuthInstance();
    const [starting, setStarting] = useState(new Date());
    const [ending, setEnding] = useState("");
    const [Chambres, setChambres] = useState([]);
    const [response, setResponse] = useState("");
    const [error, setError] = useState("");
    const [inputs, setInputs] = useState({
        start: {
            dateTime: "",
            timeZone: "Europe/Paris",
        },
        end: {
            dateTime: "",
            timeZone: "Europe/Paris",
        },
        NombrePersonne: 1,
        Nom: "",
        Prenom: "",
        Tel: "",
        Email: "",
    });

    const updateChambres = (event) => {
        if (event.target.checked) {
            if (!Chambres.includes(event.target.value)) {
                setChambres((arr) => [...arr, event.target.value]);
            }
        } else {
            setChambres((arr) => arr.filter((e) => e !== event.target.value));
        }
    };
    const handleChange = (event) => {
        const name = event.target.name;
        const value =
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    function handleSubmit(e) {
        setLoading(true);
        e.preventDefault();
        if (submitValue === "Envoyer") addEvent();
        else updateEvent();
    }
    // TEST BUTTON
    const showFormData = () => {};

    // SET EVENT FOR MODIFICATION PURPOSE

    if (eventId) getEvent();

    function getEvent() {
        var request = gapi.client.calendar.events.get({
            calendarId: "primary",
            eventId: eventId,
        });
        request.execute(function (event) {
            setInfos(event);
            if (event.error) setError(event.error.message);
        });
    }

    function setInfos(data) {
        setSubmitValue("Modifier");
        setEventToModify(eventId);

        //SET DATES
        let end = data.end.dateTime;
        setEnding(end);
        inputs.end.dateTime = end;

        let start = data.start.dateTime;
        setStarting(start);
        inputs.start.dateTime = start;
        let quantity = data.summary.split(" ")[0];

        //SET NUMBER OF PERSONS
        inputs.NombrePersonne = quantity;

        //SET CHAMBRE INFO

        let chambreData = data.summary.split(":")[1];
        if (chambreData.length > 1) {
            let chambres = chambreData.split(",");
            console.log(chambres);
            chambres.forEach((chambre) => {
                parseInt(chambre);
                document.getElementById(
                    `Chambre${chambre.trim()}`
                ).checked = true;
                setChambres((arr) => [...arr, chambre]);
            });
        } else if (chambreData.length === 1) {
            let chambre = data.summary.split(":")[1];
            document.getElementById(`Chambre${chambre.trim()}`).checked = true;
            setChambres(chambre);
        }

        //SET CONTACT INFO
        let description = data.description;
        let parseDescription = JSON.parse(description);
        inputs.Nom = parseDescription.Nom;
        inputs.Prenom = parseDescription.Prenom;
        inputs.Tel = parseDescription.Tel;
        inputs.Email = parseDescription.Email;
        setEventId("");
    }

    const updateEvent = () => {
        console.log(eventToModify);
        GoogleAuth.then(() => {
            let event = {
                start: inputs.start,
                end: inputs.end,
                summary: `${inputs.NombrePersonne} personnes, Chambres :${Chambres}`,
                description: `{"Nom" : "${inputs.Nom}", "Prenom" : "${inputs.Prenom}", "Tel" : "${inputs.Tel}", "Email" : "${inputs.Email}"}`,
                colorId: Chambres[0],

                // attendees: [
                //     {
                //         email: "",
                //     },
                // ],
            };
            var request = gapi.client.calendar.events.patch({
                calendarId: "primary",
                resource: event,
                eventId: eventToModify,
                sendUpdates: "all",
                // authorization: "bearer" + token
            });
            request.execute(function (event) {
                if (event.error) {
                    setError("Une Erreur est survenue");
                    setTimeout(() => {
                        setError("");
                    }, "3000");
                    setLoading(false);
                } else {
                    setResponse("La réservation a bien été modifiée");
                    setTimeout(() => {
                        setResponse("");
                        window.location.reload();
                    }, "3000");
                }
            });
        });
    };

    // SET EVENT FOR CREATION PURPOSE
    const addEvent = () => {
        GoogleAuth.then(() => {
            let event = {
                start: inputs.start,
                end: inputs.end,
                summary: `${inputs.NombrePersonne} personnes, Chambres :${Chambres}`,
                description: `{"Nom" : "${inputs.Nom}", "Prenom" : "${inputs.Prenom}", "Tel" : "${inputs.Tel}", "Email" : "${inputs.Email}"}`,
                colorId: Chambres[0],

                // attendees: [
                //     {
                //         email: "",
                //     },
                // ],
            };
            var request = gapi.client.calendar.events.insert({
                calendarId: "primary",
                resource: event,
                sendUpdates: "all",
                // authorization: "bearer" + token
            });
            request.execute(function (event) {
                if (event.error) {
                    setError("Une Erreur est survenue");
                    setTimeout(() => {
                        setError("");
                    }, "3000");
                    setLoading(false);
                } else {
                    setResponse("La réservation a bien été enregistrée");
                    setTimeout(() => {
                        setResponse("");
                        window.location.reload();
                    }, "3000");
                }
                console.log(event);
            });
        });
    };
    // RENDERING

    return (
        <>
       
            <div id="divSignin"></div>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Dates</legend>
                    <LocalizationProvider
                        adapterLocale={fr}
                        dateAdapter={AdapterDateFns}
                    >
                        <MobileDateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="Date d'arrivée"
                            value={starting}
                            showDaysOutsideCurrentMonth
                            minDate={new Date()}
                            onChange={(newValue) => {
                                setStarting(newValue);
                                inputs.start.dateTime = newValue;
                            }}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider
                        adapterLocale={fr}
                        dateAdapter={AdapterDateFns}
                    >
                        <MobileDateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="Date de départ"
                            minDate={starting}
                            showDaysOutsideCurrentMonth
                            value={ending ? ending : starting}
                            onChange={(newValue) => {
                                setEnding(newValue);
                                inputs.end.dateTime = newValue;
                            }}
                        />
                    </LocalizationProvider>
                </fieldset>
                <fieldset>
                    <legend>Nombre de personne</legend>
                    <label htmlFor="NombrePersonne">
                        <p>
                            <span className="nbrPers">{inputs.NombrePersonne}</span>{" "}
                            {inputs.NombrePersonne > 1 ? "personnes" : "personne"}
                        </p>
                        <input
                            type="range"
                            min="1"
                            max="20"
                            id="NombrePersonne"
                            name="NombrePersonne"
                            value={inputs.NombrePersonne || ""}
                            onChange={handleChange}
                        />
                    </label>
                </fieldset>

                <fieldset>
                    <legend>References client</legend>
                    <label htmlFor="Nom">
                        <input
                            min="5"
                            max="55"
                            type="text"
                            placeholder="Nom"
                            id="Nom"
                            name="Nom"
                            value={inputs.Nom || ""}
                            onChange={handleChange}
                        />
                    </label>
                    <label htmlFor="Prenom">
                        <input
                            min="5"
                            max="55"
                            type="text"
                            placeholder="Prenom"
                            id="Prénom"
                            name="Prenom"
                            value={inputs.Prenom || ""}
                            onChange={handleChange}
                        />
                    </label>

                    <label htmlFor="Tel">
                        <input
                            type="tel"
                            placeholder="Téléphone"
                            id="Tel"
                            name="Tel"
                            value={inputs.Tel || ""}
                            onChange={handleChange}
                        />
                    </label>

                    <label htmlFor="Email">
                        <input
                            min="5"
                            max="55"
                            type="email"
                            placeholder="E-mail"
                            id="Email"
                            name="Email"
                            value={inputs.Email || ""}
                            onChange={handleChange}
                        />
                    </label>
                </fieldset>
                <fieldset className="rooms-fieldset">
                    <legend>
                        {Chambres.length > 1 ? "Chambres " : "Chambre "}
                    </legend>
                    <label htmlFor="Chambre1">
                            <input
                                type="checkbox"
                                id="Chambre1"
                                name="Chambres"
                                value={1 || ""}
                                onChange={updateChambres}
                            />
                        <div id="Room1" className="rooms rooms-odd">
                        </div>
                    </label>
                    <label htmlFor="Chambre2">
                            <input
                                type="checkbox"
                                id="Chambre2"
                                name="Chambre2"
                                value={2 || ""}
                                onChange={updateChambres}
                            />
                        <div id="Room2" className="rooms">
                        </div>
                    </label>
                    <label htmlFor="Chambre3">
                            <input
                                type="checkbox"
                                id="Chambre3"
                                name="Chambre3"
                                value={3 || ""}
                                onChange={updateChambres}
                            />
                        <div id="Room3" className="rooms rooms-odd">
                        </div>
                    </label>
                    <label htmlFor="Chambre4">
                            <input
                                type="checkbox"
                                id="Chambre4"
                                name="Chambre4"
                                value={4 || ""}
                                onChange={updateChambres}
                            />
                        <div id="Room4" className="rooms">
                        </div>
                    </label>
                    <label htmlFor="Chambre5">
                            <input
                                type="checkbox"
                                id="Chambre5"
                                name="Chambre5"
                                value={5 || ""}
                                onChange={updateChambres}
                            />
                        <div id="Room5" className="rooms rooms-odd">
                        </div>
                    </label>
                    <label htmlFor="Chambre6">
                            <input
                                type="checkbox"
                                id="Chambre6"
                                name="Chambre6"
                                value={6 || ""}
                                onChange={updateChambres}
                            />
                        <div id="Room6" className="rooms">
                        </div>
                    </label>
                    <label htmlFor="Chambre7">
                            <input
                                type="checkbox"
                                id="Chambre7"
                                name="Chambre7"
                                value={7 || ""}
                                onChange={updateChambres}
                            />
                        <div id="Room7" className="rooms rooms-odd">
                        </div>
                    </label>
                    <label htmlFor="Chambre8">
                            <input
                                type="checkbox"
                                id="Chambre8"
                                name="Chambre8"
                                value={8 || ""}
                                onChange={updateChambres}
                            />
                        <div id="Room8" className="rooms">
                        </div>
                    </label>
                </fieldset>
                {response && <p className="response">{response} </p>}
                {error && <p className="error">{error} </p>}
                {/* <label htmlFor="sendToDB">
                    <input
                        type="checkbox"
                        id="sendToDB"
                        name="sendToDB"
                        value={inputs.sendToDB || ""}
                        onChange={handleChange}
                    />
                    Ajouter au fichier client
                </label> */}

                <div>
                    <input
                        type="submit"
                        value={loading ? "loading..." : submitValue}
                        id="submit_button"
                        disabled={loading}
                    />
                </div>
                {submitValue === "Modifier" && (
                    <button onClick={() => window.location.reload()}>
                        {" "}
                        Annuler les modifications
                    </button>
                )}
            </form>
            <br />
            <br />
            <br />
        </>
    );
}
