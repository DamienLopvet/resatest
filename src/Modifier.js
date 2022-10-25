import React, { useState } from "react";
import "./App.css";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function Modifier({ setEventId }) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const GoogleAuth = gapi.auth2?.getAuthInstance();
    const [response, setResponse] = useState("");
    const [error, setError] = useState("");
    const [eventList, setEventList] = useState([
        {
            kind: "calendar#event",
            etag: '"3332945159122000"',
            id: "74sb58j7oucbrkrtlvjdhhrn9c",
            status: "confirmed",
            htmlLink:
                "https://www.google.com/calendar/event?eid=NzRzYjU4ajdvdWNicmtydGx2amRoaHJuOWMgbGFtYWRlc3Jlc2FAbQ",
            created: "2022-10-22T21:02:28.000Z",
            updated: "2022-10-22T21:02:59.561Z",
            summary: "7 personnes, Chambres :8,1,2",
            description:
                '{"Nom" : "Damien ", "Prenom" : "lôp", "Tel" : "123456", "Email" : "ghrr@rtt.iu"}',
            colorId: "8",
            creator: {
                email: "lamadesresa@gmail.com",
                self: true,
            },
            organizer: {
                email: "lamadesresa@gmail.com",
                self: true,
            },
            start: {
                dateTime: "2022-10-23T12:01:40+02:00",
                timeZone: "Europe/Paris",
            },
            end: {
                dateTime: "2022-10-27T12:01:40+02:00",
                timeZone: "Europe/Paris",
            },
            iCalUID: "74sb58j7oucbrkrtlvjdhhrn9c@google.com",
            sequence: 0,
            reminders: {
                useDefault: true,
            },
            eventType: "default",
        },
        {
            kind: "calendar#event",
            etag: '"3332892273320000"',
            id: "sj4orr3on5po2snh1iui89sn7c",
            status: "confirmed",
            htmlLink:
                "https://www.google.com/calendar/event?eid=c2o0b3JyM29uNXBvMnNuaDFpdWk4OXNuN2MgbGFtYWRlc3Jlc2FAbQ",
            created: "2022-10-22T13:42:16.000Z",
            updated: "2022-10-22T13:42:16.660Z",
            summary: "1 personnes, Chambres :",
            description:
                '{"Nom" : "", "Prenom" : "", "Tel" : "", "Email" : ""}',
            creator: {
                email: "lamadesresa@gmail.com",
                self: true,
            },
            organizer: {
                email: "lamadesresa@gmail.com",
                self: true,
            },
            start: {
                dateTime: "2022-10-23T15:42:00+02:00",
                timeZone: "Europe/Paris",
            },
            end: {
                dateTime: "2022-10-25T15:42:00+02:00",
                timeZone: "Europe/Paris",
            },
            iCalUID: "sj4orr3on5po2snh1iui89sn7c@google.com",
            sequence: 0,
            reminders: {
                useDefault: true,
            },
            eventType: "default",
        },
    ]);

    function getEvents() {
        setLoading(true);
        GoogleAuth.then(() => {
            const request = {
                calendarId: "primary",
                timeMin: new Date().toISOString(),
                showDeleted: false,
                singleEvents: true,
                maxResults: 50,
                orderBy: "startTime",
            };

            gapi.client.calendar.events
                .list(request)
                .then((e) => {
                    if (e.result.items.length === 0)
                        setResponse("pas d'évenements prévus");
                    console.log(e.result.items);
                    setEventList(e.result.items);
                    setLoading(false);
                })
                .catch(() => {
                    setError("Une Erreur est survenue");
                    setTimeout(() => {
                        setError("");
                    }, "3000");
                    setLoading(false);
                });
        });
    }

    function deleteEvent(event) {
        setLoading(true);
        setResponse("Loading ...");
        GoogleAuth.then(() => {
            let eventId = event.target.value;

            var params = {
                calendarId: "primary",
                eventId: eventId,
            };

            let request = gapi.client.calendar.events.delete(params);
            request.execute(function (response) {
                if (response.error || response === false) {
                    alert("Error");
                    setLoading(false);
                } else {
                    setResponse("La réservation a bien été supprimée");
                    setTimeout(() => {
                        setResponse("");
                    }, "3000");
                    setEventList((arr) => arr.filter((e) => e.id !== eventId));
                    setLoading(false);
                }
            });
        });
    }
    function modify(e) {
        setLoading(true);
        let itemId = e.target.value;
        setEventId(itemId);
        navigate("/resatest/");
    }

    return (
        <>
            <button onClick={getEvents} disabled={loading}>
                {loading ? "loading..." : " Voir les évenements"}
            </button>
            {error && <p className="error">{error}</p>}
            {response && <p className="response">{response}</p>}
            <div>
                {eventList.length === 1 && <p>{eventList.length} évenement </p>}

                {eventList.length > 1 && <p>{eventList.length} évenements </p>}

                <ul>
                    {eventList.map((item, i) => (
                        <li key={item.id} className="eventCard">
                            <div id="eventCardCorner"></div>
                            <div
                                className="eventCard-start"
                                title={
                                    format(
                                        new Date(item.start.dateTime),
                                        "EEEE à H",
                                        { locale: fr }
                                    ) + "h"
                                }
                            >
                                Du{" "}
                                {format(new Date(item.start.dateTime), "dd", {
                                    locale: fr,
                                })}
                                <span className="eventCard-month">
                                    {format(
                                        new Date(item.start.dateTime),
                                        " MMMM ",
                                        { locale: fr }
                                    )}
                                </span>
                                <span>
                                    {format(
                                        new Date(item.start.dateTime),
                                        "yyyy",
                                        { locale: fr }
                                    )}
                                </span>
                            </div>
                            <div
                                className="eventCard-end"
                                title={
                                    format(
                                        new Date(item.end.dateTime),
                                        "EEEE à H",
                                        { locale: fr }
                                    ) + "h"
                                }
                            >
                                <span>
                                    Au &nbsp;
                                    {format(
                                        new Date(item.end.dateTime),
                                        "dd MMMM yyyy",
                                        { locale: fr }
                                    )}
                                </span>
                            </div>
                            <div className="eventCard-clientInfo">
                                {JSON.parse(item.description).Nom ||
                                    "pas de nom,"}
                                &nbsp;
                                {JSON.parse(item.description).Prenom ||
                                    "pas de prénom"}
                            </div>
                            <div className="eventCard-tel">
                                {JSON.parse(item.description).Tel ? (
                                    <a href="tel:{JSON.parse(item.description).Tel}">
                                        <img
                                            src="phone.svg"
                                            alt="phone icon"
                                            title="telephone"
                                            height="18"
                                            width="12"
                                        />
                                        &nbsp;
                                        {JSON.parse(item.description).Tel}
                                    </a>
                                ) : (
                                    <>
                                        <img
                                            src="phone.svg"
                                            alt="phone icon"
                                            title="telephone"
                                            height="15"
                                            width="15"
                                        />
                                        <span> Non renseigné </span>
                                    </>
                                )}
                            </div>
                            <div className="eventCard-mail">
                                {JSON.parse(item.description).Email ? (
                                    <a href="mailto:{JSON.parse(item.description).Email}">
                                        <img
                                            src="mail.svg"
                                            alt="mail icon"
                                            title="mail"
                                            width="18"
                                            height="12"
                                        />
                                        &nbsp;
                                        {JSON.parse(item.description).Email}
                                    </a>
                                ) : (
                                    <>
                                        <img
                                            src="mail.svg"
                                            alt="mail icon"
                                            title="mail"
                                            width="18"
                                            height="12"
                                        />
                                        &nbsp;
                                        <span>Non renseigné</span>
                                    </>
                                )}
                            </div>
                            <div className="eventCard-description">
                                <div className="eventCard-quantity">
                                    <img
                                        src="people.svg"
                                        alt="people icon"
                                        width="20px"
                                        height="15px"
                                        title="nombre de personnes"
                                    />
                                    <span>{item.summary.split(" ")[0]}</span>
                                </div>
                                <div className="eventCard-quantity">
                                    <img
                                        src="room.svg"
                                        alt="room icon"
                                        width="20px"
                                        height="15px"
                                        title="Chambres"
                                    />
                                    <span>
                                        {item.summary.split(":")[1] || "Ø"}
                                    </span>
                                </div>
                            </div>

                            <div className="eventCard-nav">
                                <img
                                    value={item.id}
                                    src="modification.svg"
                                    onClick={modify}
                                    alt="modification icon"
                                    title="modifer"
                                    width="30"
                                    height="30"
                                />
                                <a
                                    href={item.htmlLink}
                                    target="blank"
                                    className="eventCard-calendar"
                                >
                                    <img
                                        src="calendarIcon.svg"
                                        alt="google calendar icon"
                                        width="30"
                                        height="30"
                                    />
                                </a>

                                <img
                                    src="Delete-button.svg"
                                    alt="delete button icon"
                                    title="Supprimer"
                                    onClick={deleteEvent}
                                    value={item.id}
                                    width="25"
                                    height="25"
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
