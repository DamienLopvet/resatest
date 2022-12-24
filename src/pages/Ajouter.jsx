import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { fr } from "date-fns/locale";
import SendEvent from "../data/SendEvent";
import { useNavigate, useSearchParams } from "react-router-dom";
import getSingleEvent from "../data/getSingleEvent";
import updateEvent from "../data/updateEvent";
import NouvelleReservatinBoutton from "../utiles/NouvelleReservationButton"

export default function Ajouter() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [submitValue, setSubmitValue] = useState("ENVOYER");
    const [starting, setStarting] = useState(new Date());
    const [ending, setEnding] = useState("");
    const [Chambres, setChambres] = useState([]);
    const [message, setMessage] = useState("")
    const [response, setResponse] = useState("");
    const [error, setError] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
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
        paymentInfo: "Non_payé",
        Nom: "",
        Prenom: "",
        Tel: "",
        Email: "",
        sendInvitationToClient: false,
    });
    const eventId = searchParams.get("id");

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
        setInputs((values) => ({ ...values, [name]: value }));
    };
    const handleExitUpdateEvent=()=>{
        setSubmitValue('ENVOYER')
        setSearchParams('')
        clearForm()
    }
    function handleSubmit(e) {
        setLoading(true);
        e.preventDefault();
        if (submitValue === "ENVOYER") addEvent();
        else updateSingleEvent();
    }
    function handleCheckbox(e) {
        let paymentCheckboxes = document.querySelectorAll(
            "[name='paymentInfo']"
        );
        if (e.target.name === "paymentInfo") {
            paymentCheckboxes.forEach((box) => {
                if (box !== e.target) box.checked = false;
                else box.checked = true;
            });
            handleReservationInfo(e);
        } else if ((e.target.name = "sendInvitation")) {
            let EmailField = document.getElementById("Email");
            if (e.target.checked) {
                setInputs((values) => ({
                    ...values,
                    sendInvitationToClient: true,
                }));
                EmailField.setAttribute("required", "required");
            } else {
                EmailField.removeAttribute("required");
                setInputs((values) => ({
                    ...values,
                    sendInvitationToClient: false,
                }));
            }
        }
    }

    // SET EVENT FOR MODIFICATION PURPOSE
    useEffect(() => {
        if (eventId) getEvent();
    }, [eventId]);
    async function getEvent() {
        try {
            let response = await getSingleEvent(eventId);
            if (response.error) {
                setError(
                    "Impossible de traiter cette demande, une Erreur est survenue"
                );
                setTimeout(() => {
                    setError("");
                }, "3000");
            } else {
                setForm(response);
                setMessage("Modifiez votre évenement");
                setTimeout(() => {
                    setMessage("");
                }, "4000");
            }
        } catch (error) {
            console.log(error);
        }
    }
    function setForm(data) {
        setSubmitValue("MODIFIER");

        //SET DATES
        let end = data.end.dateTime;
        setEnding(end);
        inputs.end.dateTime = end;

        let start = data.start.dateTime;
        setStarting(start);
        inputs.start.dateTime = start;

        //SET NUMBER OF PERSONS
        let quantity = data.summary.split(" ")[0];
        inputs.NombrePersonne = quantity;

        //SET CHAMBRE INFO
        let chambreData = data.summary.split(":")[1];
        if (chambreData.length > 1) {
            let chambres = chambreData.split(",");
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

        //SET PAYMENT STATE
        let PaidCheckBox = document.querySelector(
            "[value =" + parseDescription.paymentInfo + "]"
        );
        let paymentCheckboxes = document.querySelectorAll(
            "[name='paymentInfo']"
        );
        paymentCheckboxes.forEach((box) => {
            if (box !== PaidCheckBox) box.checked = false;
            else box.checked = true;
        });
        inputs.paymentInfo = parseDescription.paymentInfo;

        //SET ATENDEE INVITATION STATE
        let invitationBox = document.querySelector('[name ="sendInvitation"');
        invitationBox.checked = parseDescription.sendInvitationToClient;
        inputs.sendInvitationToClient = parseDescription.sendInvitationToClient;
    }
    function clearForm() {

        // HANDLE INVITAION CHECK BOX
        let InvitationCheckBox = document.querySelector(
            '[name="sendInvitation"]'
        );
        InvitationCheckBox.checked = false;
        let EmailField = document.getElementById("Email");
        EmailField.removeAttribute("required");

        //HANDLE PAYMENT CHECK BOX
        let noPaidCheckBox = document.querySelector('[value = "Non_payé"]');
        let paymentCheckboxes = document.querySelectorAll(
            "[name='paymentInfo']"
        );
        paymentCheckboxes.forEach((box) => {
            if (box !== noPaidCheckBox) box.checked = false;
            else box.checked = true;
        });
        //HANDLE ROOMS CHECKBOXES
        let rooms = document.querySelectorAll(".rooms-after > input");
        rooms.forEach((room) => (room.checked = false));

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
            paymentInfo: "Non payé",
            Nom: "",
            Prenom: "",
            Tel: "",
            Email: "",
            sendInvitationToClient: false,
        });
    }

    async function updateSingleEvent() {
        if (inputs.sendInvitationToClient) {
            var setAttendee = [{ email: inputs.Email }];
        }
        let payload = {
            start: inputs.start,
            end: inputs.end,
            summary: `${inputs.NombrePersonne} personnes, Chambres :${Chambres}`,
            description: JSON.stringify(inputs),
            attendees: setAttendee,
        };
        try {
            let response = await updateEvent(payload, eventId);
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
                
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
        handleExitUpdateEvent();
    }

    // SET EVENT FOR CREATION PURPOSE
    async function addEvent() {
        if (inputs.sendInvitationToClient) {
            var setAttendee = [{ email: inputs.Email }];
        }
        let payload = {
            start: inputs.start,
            end: inputs.end,
            summary: `${inputs.NombrePersonne} personnes, Chambres :${Chambres}`,
            description: JSON.stringify(inputs),
            attendees: setAttendee,
        };
        try {
            let response = await SendEvent(payload);
            if (response.error) {
                setError(
                    "Impossible de traiter cette demande, une Erreur est survenue"
                );
                setTimeout(() => {
                    setError("");
                }, "3000");
                setLoading(false);
            } else {
                setResponse("La réservation a bien été enregistée");
                clearForm();
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
        
    }

    return (
        <>
            <div className="xl:ml-[var(--xl-sidebar-w)] lg:ml-1 mt-32 w-auto">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-row flex-wrap gap-3 justify-around px-3"
                >
                    <fieldset className=" opacity-80 dates flex flex-col bg-white mb-3 p-3 gap-5 justify-center  w-[200px]">
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

                    <fieldset className=" opacity-80 refClient flex flex-col bg-white mb-3 p-3 gap-5 justify-center w-[200px]">
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
                                className="input required:border-red-300 required:border-2 invalid:outline-red-300 valid:!outline-green-300 valid:border valid:border-slate-400"
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
                    <fieldset className=" opacity-80 chambre flex flex-row flex-wrap bg-white mb-3 p-3 gap-5 justify-center w-[200px]">
                        <legend className="-translate-y-3 -translate-x-3 font-bold">
                            {Chambres.length > 1 ? "Chambres " : "Chambre "}
                        </legend>
                        <label
                            htmlFor="Chambre1"
                            className="border border-slate-400 w-12 h-12 rounded relative after:content-['1'] rooms-after overflow-hidden"
                        >
                            <input
                                className="w-14 h-14 outline-none border-none absolute -top-1 -left-1 checked:opacity-50 accent-emerald-400"
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
                            className="rooms-after border border-slate-400 w-12 h-12 rounded relative after:content-['2'] overflow-hidden "
                        >
                            <input
                                className="w-14 h-14 outline-none border-none absolute -top-1 -left-1 checked:opacity-50 accent-emerald-400 "
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
                            className="rooms-after border border-slate-400 w-12 h-12 rounded relative after:content-['3'] overflow-hidden "
                        >
                            <input
                                className="w-14 h-14 outline-none border-none absolute -top-1 -left-1 checked:opacity-50 accent-emerald-400"
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
                            className="rooms-after border border-slate-400 w-12 h-12 rounded relative after:content-['4'] overflow-hidden "
                        >
                            <input
                                className="w-14 h-14 outline-none border-none absolute -top-1 -left-1 checked:opacity-50 accent-emerald-400"
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
                            className="rooms-after border border-slate-400 w-12 h-12 rounded relative after:content-['5'] overflow-hidden "
                        >
                            <input
                                className="w-14 h-14 outline-none border-none absolute -top-1 -left-1 checked:opacity-50 accent-emerald-400"
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
                            className="rooms-after border border-slate-400 w-12 h-12 rounded relative after:content-['6'] overflow-hidden"
                        >
                            <input
                                className="w-14 h-14 outline-none border-none absolute -top-1 -left-1 checked:opacity-50 accent-emerald-400"
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
                            className="rooms-after border border-slate-400 w-12 h-12 rounded relative after:content-['7'] overflow-hidden"
                        >
                            <input
                                className="w-14 h-14 outline-none border-none absolute -top-1 -left-1 checked:opacity-50 accent-emerald-400"
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
                            className="rooms-after border border-slate-400 w-12 h-12 rounded relative after:content-['8'] overflow-hidden "
                        >
                            <input
                                className="w-14 h-14 outline-none border-none absolute -top-1 -left-1 checked:opacity-50 accent-emerald-400"
                                type="checkbox"
                                id="Chambre8"
                                name="Chambre8"
                                value={8 || ""}
                                onChange={updateChambres}
                            />
                            <div id="Room8" className="rooms"></div>
                        </label>
                    </fieldset>
                    <div className=" opacity-80 flex flex-col gap-5 justify-start">
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
                                    onClick={handleCheckbox}
                                    name="paymentInfo"
                                    value="Non_payé"
                                    defaultChecked="checked"
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
                                    onClick={handleCheckbox}
                                    name="paymentInfo"
                                    value="Paiement_partiel"
                                    className="accent-orange-400 w-10 h-10 
                                 before:content-['Arrhes']
                                 before:absolute
                                 before:-top-5
                                 before:font-bold
                                 before:text-xs "
                                />
                                <input
                                    type="checkbox"
                                    id="paid"
                                    onClick={handleCheckbox}
                                    name="paymentInfo"
                                    value="Paiement_complet"
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
                            <input
                                type="checkbox"
                                name="sendInvitation"
                                className="w-10 h-10"
                                onClick={handleCheckbox}
                            />
                        </fieldset>
                    </div>
                    {response && (
                        <div className="response fixed top-1/3 p-5 bg-white border-2 rounded-lg font-bold text-green-400 ">
                            <p >
                                {response}{""}
                            </p>
                            <div className="flex flex-row gap-2 flex-wrap">
                          <button onClick={()=> {setResponse(''); navigate('/resatest/reservations') }}
                          className="cursor-pointer border py-1 w-36 h-14 border-slate-400  rounded shadow text-white bg-blue-500 disabled:bg-blue-300">
                            Voir les <br/> réservations</button>
                                <div onClick={()=>setResponse('') }>
                                    
                                    <NouvelleReservatinBoutton />
                                </div>

                            </div>
                        </div>
                    )}
                    {message && (
                        <p className="response fixed top-1/3 p-5 bg-white border-2 rounded-lg font-bold text-green-400 animate-bounce ">
                            {message}{""}
                        </p>
                    )}
                    {error && (
                        <p className="error absolute top-1/3 p-5 bg-white border-2 rounded-lg font-bold animate-bounce text-red-400">
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
                        <button onClick={handleExitUpdateEvent}>
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
