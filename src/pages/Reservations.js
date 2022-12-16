import React, { useEffect, useState } from "react";
import GetEvents from "../data/GetEvents";
import { useNavigate } from "react-router-dom";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import DeleteEvent from "../data/DeleteEvent";
import NouvelleReservationButton from "../utiles/NouvelleReservationButton.js";

//ICONS
import deleteIcon from "../images/icons/Delete-button.svg";
import modifyIcon from "../images/icons/modification.svg";
import googlecalendarIcon from "../images/icons/calendarIcon.svg";
import peopleIcon from "../images/icons/people.svg";
import identityIcon from "../images/icons/identity.svg";
import calendarIcon from "../images/icons/calendar-line-icon.svg";
import mailIcon from "../images/icons/mail.svg";
import phoneIcon from "../images/icons/phone.svg";
import roomIcon from "../images/icons/room.svg";
import emailNotificationIcon from "../images/icons/emailNotificationIcon.svg";

export default function Reservations() {
    const navigate = useNavigate();

    const [eventList, setEventList] = useState([]);
    var events = GetEvents("all");

    useEffect(() => {
        setEventList(() => events);
    }, [events]);

    function handleUpdateEvent(e) {
        navigate("/resatest/nouvelle-reservation?id=" + e.target.id);
    }
    function handleDeleteEvent(id) {
        let card = document.getElementById(id);
        console.log(card, id);
        card.style.height = "0px";
        card.style.padding = "0";
        card.style.border = "none";
        setTimeout(() => {
            card.style.display = "none";
            DeleteEvent(id);
            setEventList((prev) => prev.filter((el) => el.id !== id));
        }, "300");
    }

    function ParsedClientInfo(info) {
        try {
            let parsedInfo = JSON.parse(info);
            return parsedInfo;
        } catch (error) {
            let err = error;
            return err;
        }
    }
    function formatDate(el) {
        try {
            let date = format(new Date(el), "dd MMM yy '-' H'h'", {
                locale: fr,
            });
            return date;
        } catch (error) {
            return error;
        }
    }
    function setBackGroundColor(e) {
        let paymentState = ParsedClientInfo(e.description).paymentInfo;
        switch (paymentState) {
            case "Paiement_complet":
                return "#b2f3b2";

            case "Paiement_partiel":
                return "#ffdb9a";

            case "Non_payé":
                return "#f3abab";

            default:
                return "blue";
        }
    }

    return (
        <>
            <div className="xl:ml-[var(--xl-sidebar-w)] lg:ml-1 mt-32 w-auto">
                <div className="mb-5 flex xs:justify-center md:!justify-end">
                    <NouvelleReservationButton />
                </div>
                <ul>
                    <li className="py-1 flex-row md:!flex justify-between gap-3 bg-white px-5 xs:hidden items-center">
                        <p className="font-bold xs:hidden md:!block  basis-[11%]">
                            Nom Prénom
                        </p>

                        <p className="font-bold  xs:hidden md:!block  basis-[11%]">
                            Date
                        </p>

                        <p className="font-bold xs:hidden md:!block  basis-[11%]">
                            Chambres
                        </p>
                        <p className="font-bold xs:hidden md:!block  basis-[11%]">
                            Nombre de personnes
                        </p>
                        <p className="font-bold xs:hidden md:!block  basis-[11%]">
                            Téléphone
                        </p>

                        <p className="font-bold  xs:hidden md:!block  basis-[11%]">
                            Email
                        </p>

                        <p className="font-bold xs:hidden md:!block  basis-[11%]">
                            Edit
                        </p>
                    </li>
                    {eventList.map((event, index) => (
                        <li
                            style={{
                                backgroundColor: setBackGroundColor(event),
                            }}
                            key={index}
                            id={event.id}
                            className="flex px-5 md:h-[60px] overflow-hidden justify-between border-white transition-all duration-400
                        md:!flex-row
                        md:!py-1 
                        md:!w-[100%] 
                        md:!border-b-[1px]
                        md:!rounded-none
                        md:!m-0
                        md:!max-w-none
                        md:!gap-0
                        md:odd:bg-white
                        xs:flex-col
                        xs:border
                        xs:mx-auto
                        xs:my-2
                        xs:w-[95%]
                        xs:rounded-lg
                        xs:py-3
                        xs:max-w-sm
                        xs:gap-3
                        "
                        >
                            <div
                                id="client_info"
                                className="flex gap-2 basis-[11%]"
                            >
                                <img
                                    src={identityIcon}
                                    alt="identity icon"
                                    title="Nom Prénom"
                                    width="15"
                                    height="15"
                                    className="md:hidden pr-2 mr-2 w-10 border-r-2 border-slate-400 "
                                />
                                <div className="capitalize min-w-[110px]">
                                    <p className="overflow-ellipsis overflow-hidden whitespace-nowrap ">
                                        {ParsedClientInfo(event.description)
                                            .Nom || "pas de nom"}
                                    </p>
                                    <p className="overflow-ellipsis overflow-hidden whitespace-nowrap">
                                        {ParsedClientInfo(event.description)
                                            .Prenom || "pas de Prenom"}
                                    </p>
                                </div>
                            </div>
                            <div
                                id="date_info"
                                className="flex gap-2  flex-row basis-[11%]"
                            >
                                <img
                                    src={calendarIcon}
                                    alt="calendar icon"
                                    title="dates"
                                    width="15"
                                    height="15"
                                    className="md:hidden w-10 mr-2 pr-2 border-r-2 border-slate-400"
                                />

                                <div id="dates" className="">
                                    <p className="overflow-ellipsis overflow-hidden whitespace-nowrap">
                                        {formatDate(
                                            event.start.dateTime
                                        ).toString()}
                                    </p>
                                    <p className="overflow-ellipsis overflow-hidden whitespace-nowrap">
                                        {formatDate(
                                            event.end.dateTime
                                        ).toString()}
                                    </p>
                                </div>
                            </div>
                            <div
                                id="chambre_info"
                                className="flex-row gap-2  flex basis-[11%] items-center"
                            >
                                <div>
                                    <img
                                        src={roomIcon}
                                        alt="people icon"
                                        title="chambres"
                                        width="15"
                                        height="15"
                                        className="md:hidden  w-10 h-6 mr-2 pr-2  border-r-2 border-slate-400"
                                    />
                                </div>
                                <div>
                                    <p className=" text-center">
                                        {event.summary.split(":")[1] || "Ø"}
                                    </p>
                                </div>
                            </div>
                            <div
                                id="personnes_info"
                                className="flex-row gap-2  flex basis-[11%] items-center"
                            >
                                <div>
                                    <img
                                        src={peopleIcon}
                                        alt="people icon"
                                        title="nombre de personnes"
                                        width="15"
                                        height="15"
                                        className="md:hidden  w-10 h-6 mr-2 pr-2 border-r-2 border-slate-400"
                                    />
                                </div>
                                <div className="overflow-ellipsis overflow-hidden whitespace-nowrap">
                                    <p>
                                        {event.summary.split(" ")[0]} personnes
                                    </p>
                                </div>
                            </div>
                            <div
                                id="phone_info"
                                className="overflow-ellipsis overflow-hidden whitespace-nowrap flex flex-row gap-2 basis-[11%] items-center"
                            >
                                <div>
                                    <img
                                        src={phoneIcon}
                                        alt="phone icon"
                                        width="15"
                                        height="15"
                                        title="Téléphone"
                                        className="md:hidden  w-10 h-6 mr-2 pr-2 border-r-2 border-slate-400"
                                    />
                                </div>

                                <div>
                                    {ParsedClientInfo(event.description).Tel ? (
                                        <a href="tel:{ParsedClientInfo(event.description).Tel}">
                                            {
                                                ParsedClientInfo(
                                                    event.description
                                                ).Tel
                                            }
                                        </a>
                                    ) : (
                                        <span className="line-through">
                                            Téléphone
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div
                                id="email_info"
                                className="overflow-ellipsis overflow-hidden whitespace-nowrap flex flex-row gap-2  basis-[11%]"
                            >
                                <div>
                                    <img
                                        src={mailIcon}
                                        alt="mail icon"
                                        width="15"
                                        height="15"
                                        title="Email"
                                        className="md:hidden  w-10 h-5 mb-1 mr-2 pr-2 border-r-2 border-slate-400"
                                    />
                                </div>

                                <div className="overflow-ellipsis overflow-hidden whitespace-nowrap max-w-xs flex flex-row justify-start items-center gap-2">
                                    {ParsedClientInfo(event.description)
                                        .sendInvitationToClient && (
                                        <img
                                            src={emailNotificationIcon}
                                            alt="email icon"
                                            width="17"
                                            height="12"
                                        />
                                    )}
                                    {ParsedClientInfo(event.description)
                                        .Email ? (
                                        <a href="mailto:{ParsedClientInfo(event.description).Email}">
                                            {
                                                ParsedClientInfo(
                                                    event.description
                                                ).Email
                                            }
                                        </a>
                                    ) : (
                                        <span className="line-through">
                                            Email
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div
                                id="edit-info"
                                className="flex flex-row gap-3 justify-center min-w-[100px] basis-[11%] border-slate-400
                                border-t 
                            md:border-none
                            md:!pt-0
                            xs:pt-3
                            "
                            >
                                <div
                                    id="modify_event"
                                    onClick={handleUpdateEvent}
                                >
                                    <img
                                        src={modifyIcon}
                                        alt="modify icon"
                                        title="Modifier"
                                        id={event.id}
                                        width="13"
                                        height="13"
                                        className=" md:translate-y-3 cursor-pointer py-[2px] h-7 xs:w-16 md:!w-9 px-1 rounded hover:opacity-90"
                                    />
                                </div>
                                <div id="delet_event">
                                    <img
                                        src={googlecalendarIcon}
                                        alt="calendar icon"
                                        title="Voir Dans le calendrier"
                                        id={event.id}
                                        width="13"
                                        height="13"
                                        className=" md:translate-y-3 cursor-pointer py-0 h-7 xs:w-16 md:!w-9 hover:opacity-90"
                                    />
                                </div>
                                <div id="event_in_calendar">
                                    <img
                                        src={deleteIcon}
                                        alt="delete button icon"
                                        title="Supprimer"
                                        onClick={() =>
                                            handleDeleteEvent(event.id)
                                        }
                                        width="13"
                                        height="13"
                                        className=" md:translate-y-3 cursor-pointer py-1 h-7 xs:w-16 md:!w-9 px-1 rounded hover:opacity-90"
                                    />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}