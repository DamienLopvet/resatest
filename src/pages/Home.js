import React from "react";
import "../styles/main.css";
import NombreReservation from "../utiles/NombreReservation";
import GetEvents from "../data/GetEvents";
import NouvelleReservationButton from "../utiles/NouvelleReservationButton";
import NonPayes from "../utiles/NonPayes";
import Hotes from "../Hotes";

export default function Home() {
    const eventList = GetEvents("all");
    return (
        <>
            <section className="xl:ml-[20rem] mt-20">
                <h1 className="text-3xl font-semibold ml-5 mb-3">Bienvenue</h1>
                {/* <h2>{GoogleAuth}</h2>*/}
                <div className="flex gap-4 flex-row flex-wrap ml-5">
                    <div class="basis-[100%] " >
                        <NouvelleReservationButton />
                    </div>
                    <NombreReservation eventList={eventList} />
                    <NonPayes eventList={eventList} />
                    <Hotes eventList={eventList} />
                </div>
            </section>
        </>
    );
}
