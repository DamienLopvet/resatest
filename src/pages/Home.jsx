import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";
import NombreReservation from "../utiles/NombreReservation";
import GetEvents from "../data/GetEvents";
import NouvelleReservationButton from "../utiles/NouvelleReservationButton";
import NonPayes from "../utiles/NonPayes";
import Hotes from "../utiles/Hotes";
import { UserContext } from "../UserContext.js";
import NonConnected from "../utiles/NonConnected";
import NumberOfReservationToCome from "../utiles/NumberOfReservationToCome";
import Notes from "./Notes";

export default function Home({ notes }) {
    const navigate = useNavigate();

    const { user } = useContext(UserContext);
    const [eventList, setEventList] = useState([]);

    useEffect(() => {
        GetEvents("all", user).then((e) => setEventList(e));
    }, [user]);

    return (
        <>
            <section id="home_section">
                <div className="xl:ml-[20rem]">
                    <h1 className="pt-10 text-3xl font-semibold ml-5 mb-3">Bienvenue</h1>
                    {/* <h2>{GoogleAuth}</h2>*/}
                    <div className="flex gap-4 flex-row flex-wrap mx-5 xs:justify-center sm:justify-start">
                        <div
                            className="basis-[100%] flex justify-start gap-1
                        "
                        >
                            <NouvelleReservationButton />
                            <NumberOfReservationToCome eventList={eventList} />
                        </div>
                        <NombreReservation eventList={eventList} />
                        <NonPayes eventList={eventList} />
                        <Hotes eventList={eventList} />
                        {notes.length ? <>
                        <div id="notes_container" className="mt-10 basis-[100%] cursor-pointer"
                                            onClick={() => navigate("/resatest/Notes")}
                                            >
                        <h1 className="xs:max-md:text-center xs:max-md:-translate-x-2 text-2xl font-bold ml-5 mb-5">Notes</h1>
                            <Notes notes={notes} />
                        </div></>:""}
                        {!notes.length && <div className="basis-[100%]">
                            <p className="text-xl border p-3 rounded-xl mt-10 w-fit" > pas de notes enregistrées</p>
                        </div>}
                    </div>
                </div>
                {!user.isLogged && <NonConnected />}
            </section>
        </>
    );
}
