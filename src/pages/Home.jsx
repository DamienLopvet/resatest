import React, { useState,useEffect, useContext } from "react";
import "../styles/main.css";
import NombreReservation from "../utiles/NombreReservation";
import GetEvents from "../data/GetEvents";
import NouvelleReservationButton from "../utiles/NouvelleReservationButton";
import NonPayes from "../utiles/NonPayes";
import Hotes from "../utiles/Hotes";
import { UserContext } from "../UserContext.js" 
import NonConnected from "../utiles/NonConnected";
import NumberOfReservationToCome from "../utiles/NumberOfReservationToCome";


export default function Home() {
    const {user} = useContext(UserContext);
    const [eventList, setEventList] = useState([])
  
   useEffect(() => {
        GetEvents('all', user).then((e)=> setEventList(e))
    }, [user]);
   
    return (
        <>
            <section>

                <div className="xl:ml-[20rem]">
                    <h1 className="pt-10 text-3xl font-semibold ml-5 mb-3">Bienvenue</h1>
                    {/* <h2>{GoogleAuth}</h2>*/}
                    <div className="flex gap-4 flex-row flex-wrap mx-5 xs:justify-center sm:justify-start">
                        <div className="basis-[100%] flex justify-start gap-1
                        " >
                            <NouvelleReservationButton />
                            <NumberOfReservationToCome eventList={eventList} />
                        </div>
                        <NombreReservation eventList={eventList} />
                        <NonPayes eventList={eventList} />
                        <Hotes eventList={eventList} />
                    </div>
                </div>
                {!user.isLogged && <NonConnected/>}
            </section>
        </>
    );
}
