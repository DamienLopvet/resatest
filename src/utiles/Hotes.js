import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Hotes({ eventList }) {
    const navigate = useNavigate();

    const [nombreHote, setNombreHote] = useState(0);
    useEffect(() => {
        let sumHost = 0;
        for (const event of eventList) {
            try {
                let hostInEvent = parseInt(event.summary.slice(0,2));
                if (isNaN(hostInEvent)) continue;
                sumHost += hostInEvent
            } catch (e) {
                console.log(e);
            }
        }
        setNombreHote(sumHost);

    }, [eventList]);

    return (
        <div className="min-w-[250px] w-60 bg-white text-center pt-3">
            <h3 className="font-bold text-xl text-slate-600 capitalize">
                Hôtes
            </h3>
            <p className="text-9xl font-bold text-yellow-500">{nombreHote || "Ø"} </p>
            <p className="text-yellow-500 my-3">PERSONNES</p>
            <button className="rounded-none py-1 px-3 w-[85%] mb-3 bg-yellow-500 text-white"  onClick={()=> navigate("/resatest/reservations?sort=name first")} >
                CARNET D'ADRESSE
            </button>
        </div>
    );
}
