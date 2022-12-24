import React, { useState,useEffect } from "react";
import "../styles/main.css";
import NombreReservation from "../utiles/NombreReservation";
import GetEvents from "../data/GetEvents";
import NouvelleReservationButton from "../utiles/NouvelleReservationButton";
import NonPayes from "../utiles/NonPayes";
import Hotes from "../utiles/Hotes";


export default function Home() {
    const [eventList, setEventList] = useState([])
   
   useEffect(() => {
        GetEvents('all').then((e)=> setEventList(e))
    }, []);
   
    return (
        <>
            <section>

                <div className="xl:ml-[20rem]">
                    <h1 className="pt-10 text-3xl font-semibold ml-5 mb-3">Bienvenue</h1>
                    {/* <h2>{GoogleAuth}</h2>*/}
                    <div className="flex gap-4 flex-row flex-wrap mx-5 xs:justify-center sm:justify-start">
                        <div className="basis-[100%]" >
                            <NouvelleReservationButton />
                        </div>
                        <NombreReservation eventList={eventList} />
                        <NonPayes eventList={eventList} />
                        <Hotes eventList={eventList} />
                    </div>
                </div>
            </section>
        </>
    );
}
