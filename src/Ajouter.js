import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { fr } from "date-fns/locale";
import "./App.css";

export default function Ajouter() {
    const [value, setValue] = useState(new Date(Date.now()));
    const [nbrPersons, setNbrPersons] = useState(0);
    const handleChange = (event) => {
        setNbrPersons(event.target.value);
    };
    return (
        <>
            <form>
                <fieldset>
                    <legend>Dates</legend>
                    <LocalizationProvider locale={fr} dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="Date d'arrivée"
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider locale={fr} dateAdapter={AdapterDateFns}>
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
                <label for="NombrePersonne">
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
                    <label for="Nom">
                        <input
                            type="text"
                            placeholder="Nom"
                            id="Nom"
                            name="Nom"
                        />
                    </label>
                    <label for="Prenom">
                        <input
                            type="text"
                            placeholder="Prenom"
                            id="Prénom"
                            name="Prenom"
                        />
                    </label>

                    <label for="Tel">
                        <input
                            type="tel"
                            placeholder="Téléphone"
                            id="Tel"
                            name="Tel"
                        />
                    </label>

                    <label for="Email">
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
                        <label for="Chambre1">
                    <div id="Room1" class="rooms">
                        <input
                            type="checkbox"
                            id="Chambre1"
                            name="Chambre1"
                            value="Chambre1"
                        />
                    </div>
                    </label>
                    <label for="Chambre2">
                    <div id="Room2" class="rooms">
                        <input
                            type="checkbox"
                            id="Chambre2"
                            name="Chambre2"
                            value="Chambre2"
                        />
                    </div>
                    </label>
                        <label for="Chambre3">
                    <div id="Room3" class="rooms">
                        <input
                            type="checkbox"
                            id="Chambre3"
                            name="Chambre3"
                            value="Chambre3"
                        />
                    </div>
                    </label>
                        <label for="Chambre4">
                    <div id="Room4" class="rooms">
                        <input
                            type="checkbox"
                            id="Chambre4"
                            name="Chambre4"
                            value="Chambre4"
                        />
                    </div>
                    </label>
                        <label for="Chambre5">
                    <div id="Room5" class="rooms">
                        <input
                            type="checkbox"
                            id="Chambre5"
                            name="Chambre5"
                            value="Chambre5"
                        />
                    </div>
                    </label>
                        <label for="Chambre6">
                    <div id="Room6" class="rooms">
                        <input
                            type="checkbox"
                            id="Chambre6"
                            name="Chambre6"
                            value="Chambre6"
                        />
                    </div>
                    </label>
                        <label for="Chambre7">
                    <div id="Room7" class="rooms">
                        <input
                            type="checkbox"
                            id="Chambre7"
                            name="Chambre7"
                            value="Chambre7"
                        />
                    </div>
                    </label>
                        <label for="Chambre8">
                    <div id="Room8" class="rooms">
                        <input
                            type="checkbox"
                            id="Chambre8"
                            name="Chambre8"
                            value="Chambre8"
                        />
                    </div>
                    </label>
                </fieldset>
                <label for="sendToDB">
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
