import React from "react";
import "./styles/main.css";
import Header from "./Header";
import NombreReservation from "./NombreReservation";
import GetEvents from "./data/GetEvents";
import { useEffect, useState } from "react";


export default function Home() {
 const eventList = GetEvents()

    return (
        <>
        <Header />
            <section className="xl:ml-[20rem]">
                <h1 className="text-3xl font-semibold ml-5">Bienvenue</h1>
                {/* <h2>{GoogleAuth}</h2>*/}
                <div> 
                 <NombreReservation eventList={eventList} />
         
                </div>
                

            </section>
        </>
    );
}
