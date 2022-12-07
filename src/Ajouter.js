import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { fr } from "date-fns/locale";
import SendEvent from "./data/SendEvent";
import { gapi } from "gapi-script";

export default function Ajouter({ eventId, setEventId }) {
    const [loading, setLoading] = useState(false);
    const [eventToModify, setEventToModify] = useState("");
    const [submitValue, setSubmitValue] = useState("ENVOYER");
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
        PaymentInfo: "Non renseigné",
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
    const handleReservationInfo = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        // event.target.type === "checkbox"
        //     ? event.target.checked
        //     :
        setInputs((values) => ({ ...values, [name]: value }));
    };

    function handleSubmit(e) {
        setLoading(true);
        e.preventDefault();
        if (submitValue === "ENVOYER") addEvent();
        else updateEvent();
    }
    function handlePaymentInfoCheckbox(e) {
        let checkboxes = document.getElementsByName("paymentInfo");
        console.log(checkboxes);
        checkboxes.forEach((box) => {
            if (box !== e.target) box.checked = false;
        });
    }

    // SET EVENT FOR MODIFICATION PURPOSE

    if (eventId) getEvent();

    function getEvent() {
        var request = gapi.client.calendar.events.get({
            calendarId: "primary",
            eventId: eventId,
        });
        request.execute(function (event) {
            setForm(event);
            if (event.error) setError(event.error.message);
            setTimeout(() => {
                setError("");
            }, "3000");
        });
    }
    function clearForm() {
        setStarting(new Date());
        setEnding(new Date());
        setChambres(() => []);
        setInputs({
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
    }
    function setForm(data) {
        setSubmitValue("MODIFIER");
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
                    setError(
                        "Impossible de traiter cette demande, une Erreur est survenue"
                    );
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
    async function addEvent() {
        console.log(inputs);
        let payload = {
            start: inputs.start,
            end: inputs.end,
            summary: `${inputs.NombrePersonne} personnes, Chambres :${Chambres}`,
            description: `{"Nom" : "${inputs.Nom}", "Prenom" : "${inputs.Prenom}", "Tel" : "${inputs.Tel}", "Email" : "${inputs.Email}"}`,

            // attendees: [
            //     {
            //         email: "",
            //     },
            // ],
        };
        try {
            const response = await SendEvent(payload);
            if (response.error) {
                setError(
                    "Impossible de traiter cette demande, une Erreur est survenue"
                );
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
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
        clearForm();
    }

    return (
        <>
            <div className="xl:ml-[var(--xl-sidebar-w)] lg:ml-1 mt-32 w-auto">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-row flex-wrap gap-3 justify-around px-3"
                >
                    <fieldset className="dates flex flex-col bg-white mb-3 p-3 gap-5 justify-center  w-[200px]">
                        <legend className="-translate-y-3 -translate-x-3 font-bold">
                            Dates
                        </legend>
                        <LocalizationProvider
                            adapterLocale={fr}
                            dateAdapter={AdapterDateFns}
                        >
                            <MobileDateTimePicker
                                renderInput={(props) => (
                                    <TextField {...props} />
                                )}
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
                                renderInput={(props) => (
                                    <TextField {...props} />
                                )}
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

                    <fieldset className="refClient flex flex-col bg-white mb-3 p-3 gap-5 justify-center w-[200px]">
                        <legend className="-translate-y-3 -translate-x-3 font-bold">
                            References client
                        </legend>
                        <label htmlFor="Nom">
                            <input
                                className="input"
                                min="5"
                                max="55"
                                type="text"
                                placeholder="Nom"
                                id="Nom"
                                name="Nom"
                                value={inputs.Nom || ""}
                                onChange={handleReservationInfo}
                            />
                        </label>
                        <label htmlFor="Prenom">
                            <input
                                className="input"
                                min="5"
                                max="55"
                                type="text"
                                placeholder="Prénom"
                                id="Prénom"
                                name="Prenom"
                                value={inputs.Prenom || ""}
                                onChange={handleReservationInfo}
                            />
                        </label>

                        <label htmlFor="Tel">
                            <input
                                className="input"
                                type="tel"
                                placeholder="Téléphone"
                                id="Tel"
                                name="Tel"
                                value={inputs.Tel || ""}
                                onChange={handleReservationInfo}
                            />
                        </label>

                        <label htmlFor="Email">
                            <input
                                className="input"
                                min="5"
                                max="55"
                                type="email"
                                placeholder="E-mail"
                                id="Email"
                                name="Email"
                                value={inputs.Email || ""}
                                onChange={handleReservationInfo}
                            />
                        </label>
                    </fieldset>
                    <fieldset className="chambre flex flex-row flex-wrap bg-white mb-3 p-3 gap-5 justify-center w-[200px]">
                        <legend className="-translate-y-3 -translate-x-3 font-bold">
                            {Chambres.length > 1 ? "Chambres " : "Chambre "}
                        </legend>
                        <label
                            htmlFor="Chambre1"
                            className="border border-slate-400 w-12 h-12 rounded relative "
                        >
                            <input
                                className="rooms-after absolute top-0 bottom-0 right-0 left-0 after:content-['1'] checked:opacity-50"
                                type="checkbox"
                                id="Chambre1"
                                name="Chambres"
                                value={1 || ""}
                                onChange={updateChambres}
                            />
                            <div id="Room1" className="rooms rooms-odd"></div>
                        </label>
                        <label
                            htmlFor="Chambre2"
                            className="border border-slate-400 w-12 h-12 rounded relative "
                        >
                            <input
                                className="rooms-after absolute top-0 bottom-0 right-0 left-0 after:content-['2'] checked:opacity-50 "
                                type="checkbox"
                                id="Chambre2"
                                name="Chambre2"
                                value={2 || ""}
                                onChange={updateChambres}
                            />
                            <div id="Room2" className="rooms"></div>
                        </label>
                        <label
                            htmlFor="Chambre3"
                            className="border border-slate-400 w-12 h-12 rounded relative "
                        >
                            <input
                                className="rooms-after absolute top-0 bottom-0 right-0 left-0 after:content-['3'] checked:opacity-50"
                                type="checkbox"
                                id="Chambre3"
                                name="Chambre3"
                                value={3 || ""}
                                onChange={updateChambres}
                            />
                            <div id="Room3" className="rooms rooms-odd"></div>
                        </label>
                        <label
                            htmlFor="Chambre4"
                            className="border border-slate-400 w-12 h-12 rounded relative "
                        >
                            <input
                                className="rooms-after absolute top-0 bottom-0 right-0 left-0 after:content-['4'] checked:opacity-50"
                                type="checkbox"
                                id="Chambre4"
                                name="Chambre4"
                                value={4 || ""}
                                onChange={updateChambres}
                            />
                            <div id="Room4" className="rooms"></div>
                        </label>
                        <label
                            htmlFor="Chambre5"
                            className="border border-slate-400 w-12 h-12 rounded relative "
                        >
                            <input
                                className="rooms-after absolute top-0 bottom-0 right-0 left-0 after:content-['5'] checked:opacity-50"
                                type="checkbox"
                                id="Chambre5"
                                name="Chambre5"
                                value={5 || ""}
                                onChange={updateChambres}
                            />
                            <div id="Room5" className="rooms rooms-odd"></div>
                        </label>
                        <label
                            htmlFor="Chambre6"
                            className="border border-slate-400 w-12 h-12 rounded relative "
                        >
                            <input
                                className="rooms-after absolute top-0 bottom-0 right-0 left-0 after:content-['6'] checked:opacity-50"
                                type="checkbox"
                                id="Chambre6"
                                name="Chambre6"
                                value={6 || ""}
                                onChange={updateChambres}
                            />
                            <div id="Room6" className="rooms"></div>
                        </label>
                        <label
                            htmlFor="Chambre7"
                            className="border border-slate-400 w-12 h-12 rounded relative "
                        >
                            <input
                                className="rooms-after absolute top-0 bottom-0 right-0 left-0 after:content-['7'] checked:opacity-50"
                                type="checkbox"
                                id="Chambre7"
                                name="Chambre7"
                                value={7 || ""}
                                onChange={updateChambres}
                            />
                            <div id="Room7" className="rooms rooms-odd"></div>
                        </label>
                        <label
                            htmlFor="Chambre8"
                            className="border border-slate-400 w-12 h-12 rounded relative "
                        >
                            <input
                                className="rooms-after absolute top-0 bottom-0 right-0 left-0 after:content-['8'] checked:opacity-50"
                                type="checkbox"
                                id="Chambre8"
                                name="Chambre8"
                                value={8 || ""}
                                onChange={updateChambres}
                            />
                            <div id="Room8" className="rooms"></div>
                        </label>
                    </fieldset>
                    <div className="flex flex-col gap-5 justify-start">
                        <fieldset className="nombre flex flex-col bg-white mb-3 p-3 gap-5 justify-center w-[200px]">
                            <legend className="-translate-y-3 -translate-x-3 font-bold">
                                Nombre de personne
                            </legend>
                            <label htmlFor="NombrePersonne">
                                <p>
                                    <span className="nbrPers">
                                        {inputs.NombrePersonne}
                                    </span>{" "}
                                    {inputs.NombrePersonne > 1
                                        ? "personnes"
                                        : "personne"}
                                </p>
                                <input
                                    className="w-[100%]"
                                    type="range"
                                    min="1"
                                    max="20"
                                    id="NombrePersonne"
                                    name="NombrePersonne"
                                    value={inputs.NombrePersonne || ""}
                                    onChange={handleReservationInfo}
                                />
                            </label>
                        </fieldset>
                        <fieldset className="nombre flex flex-col bg-white mb-3 p-3 gap-5 justify-center w-[200px]">
                            <legend className="-translate-y-3 -translate-x-3 font-bold">
                                Paiement
                            </legend>
                            <label
                                htmlFor="paid"
                                className="relative flex flex-row gap-7"
                            >
                                <input
                                    type="checkbox"
                                    id="NotPaid"
                                    onClick={handlePaymentInfoCheckbox}
                                    name="paymentInfo"
                                    value="Non payé"
                                    className="accent-red-500 w-10 h-10 border 
                                 before:content-['Rien']
                                 before:absolute
                                 before:-top-5
                                 before:font-bold
                                 before:text-xs "
                                />
                                <input
                                    type="checkbox"
                                    id="PartialyPaid"
                                    onClick={handlePaymentInfoCheckbox}
                                    name="paymentInfo"
                                    value="Paiement partiel"
                                    className="accent-orange-500 w-10 h-10 
                                 before:content-['Arrhes']
                                 before:absolute
                                 before:-top-5
                                 before:font-bold
                                 before:text-xs "
                                />
                                <input
                                    type="checkbox"
                                    id="paid"
                                    onClick={handlePaymentInfoCheckbox}
                                    name="paymentInfo"
                                    value="Paiement complet "
                                    className="accent-green-300 w-10 h-10 border 
                                 before:content-['Tout']
                                 before:absolute
                                 before:-top-5
                                 before:font-bold
                                 before:text-xs "
                                />
                            </label>
                        </fieldset>
                        <fieldset className="flex flex-row bg-white mb-3 p-3 gap-5 justify-center w-[200px]">
                            <legend className="-translate-y-3 -translate-x-3 font-bold">
                                Invitation
                            </legend>
                            <label
                                htmlFor="invitation"
                                className="text-sm font-bold"
                            >
                                Envoyer une invitation au client
                            </label>
                            <input type="checkbox" className="w-10 h-10" />
                        </fieldset>
                    </div>
                    {response && (
                        <p className="response absolute p-5 bg-white border-2 rounded-lg font-bold text-green-400 animate-bounce ">
                            {response}{" "}
                        </p>
                    )}
                    {error && (
                        <p className="error absolute p-5 bg-white border-2 rounded-lg font-bold animate-bounce text-red-400">
                            {error}{" "}
                        </p>
                    )}
                    {/* <label htmlFor="sendToDB">
                    <input
                        type="checkbox"
                        id="sendToDB"
                        name="sendToDB"
                        value={inputs.sendToDB || ""}
                        onChange={handleReservationInfo}
                    />
                    Ajouter au fichier client
                </label> */}

                    <div className="basis-[100%] mx-auto flex justify-center">
                        <input
                            className="cursor-pointer border py-2 w-[200px] rounded shadow text-white bg-blue-600 disabled:bg-blue-300"
                            type="submit"
                            value={loading ? "LOADING..." : submitValue}
                            id="submit_button"
                            disabled={loading}
                        />
                    </div>
                    {submitValue === "MODIFIER" && (
                        <button onClick={() => window.location.reload()}>
                            {" "}
                            Annuler les modifications
                        </button>
                    )}
                </form>
                <br />
                <br />
                <br />
            </div>
        </>
    );
}
