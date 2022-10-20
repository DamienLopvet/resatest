import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { fr } from "date-fns/locale";
import "./App.css";
import { gapi } from "gapi-script";

export default function Ajouter( {eventId, setEventId } ) {
   
    if(eventId) getEvent()
    const [submitValue, setSubmitValue] = useState('Envoyer')
    const  GoogleAuth = gapi.auth2?.getAuthInstance();
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
   
    const showFormData = () => {
   
    };
    function getEvent() {
        
        var request = gapi.client.calendar.events.get({
            calendarId: "primary",
            eventId: eventId,
        });
        request.execute(function (event) {
            console.log(event);
            setInfo(event)
            if (event.error) setError(event.error.message);
        });  
        
    }
    function setInfo(data) {
        setSubmitValue('Modifier')
        let id = eventId
        console.log(id);
        setEnding(data.end.dateTime)
        setStarting(data.start.dateTime)
        let quantity =  data.summary.split(' ')[0];
        inputs.NombrePersonne = quantity;
        console.log(data.summary.split(':')[1]);
        let chambreData = data.summary.split(':')[1];
        if(chambreData.length > 1){
          let chambres = chambreData.split(',')
          console.log(chambres);
          chambres.forEach((chambre)=>{
            parseInt(chambre)
          document.getElementById(`Chambre${chambre.trim()}`).checked = true;

          } )
        }
        setEventId('')
    }
    const addEvent = (e) => {
        e.preventDefault();

        GoogleAuth.then(() => {
            let dynamicEvent = {
                start: inputs.start,
                end: inputs.end,
                summary: `${inputs.NombrePersonne} personnes, Chambres :${Chambres}`,
                description: `Nom :  ${inputs.Nom} , Tel : ${inputs.Tel}`,
                colorId: Chambres[0],
                location: [...Chambres],

                // attendees: [
                //     {
                //         email: "",
                //     },
                // ],
            };
            let event = {
                ...dynamicEvent,
                // summary: "Google I/O 2015",
                // location: "800 Howard St., San Francisco, CA 94103",
                // description:
                //     "A chance to hear more about Google's developer products.",
                // colorId: "3",
                // start: {
                //     dateTime: "2022-10-28T11:00:00-07:00",
                //     timeZone: "America/Los_Angeles",
                // },
                // end: {
                //     dateTime: "2022-11-28T12:00:00-07:00",
                //     timeZone: "America/Los_Angeles",
                // },
            };

            var request = gapi.client.calendar.events.insert({
                calendarId: "primary",
                resource: event,
                sendUpdates: "all",
                // authorization: "bearer" + token
            });
            request.execute(function (event) {
                setResponse(event.status);
                if (event.error) setError(event.error.message);
                console.log(event);
            });
        });
    };

    return (
        <>
        <div id="divSignin"></div>
            <button onClick={showFormData}>test</button>
            <form onSubmit={addEvent}>
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
                            value={ending ? ending : starting}
                            onChange={(newValue) => {
                                setEnding(newValue);
                                inputs.end.dateTime = newValue;
                            }}
                        />
                    </LocalizationProvider>
                </fieldset>
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
                <fieldset>
                    <legend>References client</legend>
                    <label htmlFor="Nom">
                        <input
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
                            type="email"
                            placeholder="E-mail"
                            id="Email"
                            name="Email"
                            value={inputs.Email || ""}
                            onChange={handleChange}
                        />
                    </label>
                </fieldset>
                <fieldset>
                    <legend>
                        {Chambres.length > 1 ? "Chambres " : "Chambre "}
                    </legend>
                    <label htmlFor="Chambre1">
                        <div id="Room1" className="rooms">
                            <input
                                type="checkbox"
                                id="Chambre1"
                                name="Chambres"
                                value={1 || ""}
                                onChange={updateChambres}
                            />
                        </div>
                    </label>
                    <label htmlFor="Chambre2">
                        <div id="Room2" className="rooms">
                            <input
                                type="checkbox"
                                id="Chambre2"
                                name="Chambre2"
                                value={2 || ""}
                                onChange={updateChambres}
                            />
                        </div>
                    </label>
                    <label htmlFor="Chambre3">
                        <div id="Room3" className="rooms">
                            <input
                                type="checkbox"
                                id="Chambre3"
                                name="Chambre3"
                                value={3 || ""}
                                onChange={updateChambres}
                            />
                        </div>
                    </label>
                    <label htmlFor="Chambre4">
                        <div id="Room4" className="rooms">
                            <input
                                type="checkbox"
                                id="Chambre4"
                                name="Chambre4"
                                value={4 || ""}
                                onChange={updateChambres}
                            />
                        </div>
                    </label>
                    <label htmlFor="Chambre5">
                        <div id="Room5" className="rooms">
                            <input
                                type="checkbox"
                                id="Chambre5"
                                name="Chambre5"
                                value={5 || ""}
                                onChange={updateChambres}
                            />
                        </div>
                    </label>
                    <label htmlFor="Chambre6">
                        <div id="Room6" className="rooms">
                            <input
                                type="checkbox"
                                id="Chambre6"
                                name="Chambre6"
                                value={6 || ""}
                                onChange={updateChambres}
                            />
                        </div>
                    </label>
                    <label htmlFor="Chambre7">
                        <div id="Room7" className="rooms">
                            <input
                                type="checkbox"
                                id="Chambre7"
                                name="Chambre7"
                                value={7 || ""}
                                onChange={updateChambres}
                            />
                        </div>
                    </label>
                    <label htmlFor="Chambre8">
                        <div id="Room8" className="rooms">
                            <input
                                type="checkbox"
                                id="Chambre8"
                                name="Chambre8"
                                value={8 || ""}
                                onChange={updateChambres}
                            />
                        </div>
                    </label>
                </fieldset>
                {response && <p>{response}</p>}
                {error && <p>{error} </p>}
                <label htmlFor="sendToDB">
                    <input
                        type="checkbox"
                        id="sendToDB"
                        name="sendToDB"
                        value={inputs.sendToDB || ""}
                        onChange={handleChange}
                    />
                    Ajouter au fichier client
                </label>

                <div>
                    <input type="submit" value={submitValue} id="submit_button"/>
                </div>
            </form>
            <br />
            <br />
            <br />
        </>
    );
}
