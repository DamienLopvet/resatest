import React, { useState, useEffect, useContext } from "react";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function Modifier({ setEventId }) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const GoogleAuth = gapi.auth2.getAuthInstance()
    const [response, setResponse] = useState("");
    const [error, setError] = useState("");
    const [eventList, setEventList] = useState([]);
    useEffect(() => {
        setLoading(true);
        if (!GoogleAuth) {
            window.confirm(
                "Une erreure est survenue la page doit etre rechargée "
            );
            navigate("/resatest/");
            window.location.reload();
        }
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
    }, []);

    function deleteEvent(event) {
        setLoading(true);
        setResponse("Loading ...");
        GoogleAuth.then(() => {
            let eventId = event.target.id;

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
        let itemId = e.target.id;
        console.log(itemId);
        setEventId(itemId);
        navigate("/resatest/");
    }
    return (
        <>

            {error && <p className="error">{error}</p>}
            {response && <p className="response">{response}</p>}
            <div className="eventQuantity">
                {eventList.length === 1 && (
                    <p>
                        <span className="eventQuantity-number">
                            {eventList.length}
                        </span>{" "}
                        Réservation{" "}
                    </p>
                )}

                {eventList.length > 1 && (
                    <p>
                        <span className="eventQuantity-number">
                            {eventList.length}
                        </span>{" "}
                        Réservations{" "}
                    </p>
                )}
            </div>
            <ul className="eventsList">
                {eventList.map((item, i) => (
                    <li key={item.id} className="eventCard">
                        <div id="eventCardCorner"></div>
                        <div className="eventCard-clientInfo">
                            <h2 className="eventCard-clientInfo-nom">
                                {JSON.parse(item?.description).Nom ||
                                    "pas de nom,"}
                            </h2>
                            &nbsp;
                            <h2 className="eventCard-clientInfo-prenom">
                                {JSON.parse(item.description).Prenom || ", '?'"}
                            </h2>
                        </div>
                        <div className="eventCard-date">
                            <div
                                className="eventCard-date-start"
                                title={format(
                                    new Date(item.start.dateTime),
                                    "EEEE",
                                    { locale: fr }
                                )}
                            >
                                Du{" "}
                                {format(new Date(item.start.dateTime), "dd", {
                                    locale: fr,
                                })}
                                <span className="eventCard-date-start-month">
                                    <strong>
                                        {format(
                                            new Date(item.start.dateTime),
                                            " MMM ",
                                            { locale: fr }
                                        )}
                                    </strong>
                                </span>
                                <span>
                                    {format(
                                        new Date(item.start.dateTime),
                                        "yyyy à H",
                                        { locale: fr }
                                    )}
                                    h
                                </span>
                            </div>
                            <div
                                className="eventCard-date-end"
                                title={format(
                                    new Date(item.end.dateTime),
                                    "EEEE",
                                    { locale: fr }
                                )}
                            >
                                <span>
                                    Au &nbsp;
                                    {format(
                                        new Date(item.end.dateTime),
                                        "dd MMM yyyy à H",
                                        { locale: fr }
                                    )}
                                    h
                                </span>
                            </div>
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
                                    <span>
                                        {JSON.parse(item.description).Email}
                                    </span>
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
                                <span>{item.summary.split(":")[1] || "Ø"}</span>
                            </div>
                        </div>

                        <div className="eventCard-nav">
                            <img
                                id={item.id}
                                src="modification.svg"
                                onClick={modify}
                                alt="modification icon"
                                title="modifer"
                                width="25"
                                height="25"
                            />
                            <a
                                href={item.htmlLink}
                                target="blank"
                                className="eventCard-calendar"
                            >
                                <img
                                    src="calendarIcon.svg"
                                    alt="google calendar icon"
                                    title="Afficher dans le calendrier  "
                                    width="30"
                                    height="30"
                                />
                            </a>

                            <img
                                src="Delete-button.svg"
                                alt="delete button icon"
                                title="Supprimer"
                                onClick={deleteEvent}
                                id={item.id}
                                width="20"
                                height="20"
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}
