import React from "react";
import "./styles/main.css";
import Header from "./Header";
import NombreReservation from "./NombreReservation";
import GetEvents from "./data/GetEvents";
import NouvelleReservation from "./NouvelleReservation";
import NonPayes from "./NonPayes";
import Hotes from "./Hotes";


export default function Home() {
 const eventList = GetEvents()
    return (
        <>
        <Header />
            <section className="xl:ml-[20rem]">
                <h1 className="text-2xl font-semibold ml-5">Bienvenue</h1>
                {/* <h2>{GoogleAuth}</h2>*/}
                <div className="flex gap-3 flex-row flex-wrap"> 
                <NouvelleReservation />
                 <NombreReservation eventList={eventList} />
                 <NonPayes eventList={eventList} />
                 <Hotes eventList={eventList}/>
                </div>
                

            </section>
        </>
    );
}
