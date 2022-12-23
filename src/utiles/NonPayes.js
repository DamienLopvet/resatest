import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NonPayes({ eventList }) {
    const navigate = useNavigate();

    const [nonPaid, setNonPaid] = useState([]);
    useEffect(() => {
        const filteredEvents = eventList.filter(
            (event) => JSON.parse(event.description).paymentInfo === "Non_payé"
        );
        setNonPaid(() => filteredEvents);
    }, [eventList]);
    return (
        <div className="min-w-[250px] w-60 bg-white text-center opacity-80">
            <h3 className="font-bold mt-3 text-xl text-slate-600 capitalize">
                Non Payés
            </h3>
            {nonPaid.length > 0 ? (
                <p className="text-9xl font-bold text-red-700">
                    {nonPaid.length}
                </p>
            ) : (
                <p className="text-9xl font-bold text-red-700">Ø </p>
            )}
            <p className="text-red-700 my-3">RESERVATION{nonPaid.length > 1 && 'S'}</p>
            <button onClick={()=> navigate("/resatest/reservations?sort=unpaid")} className="rounded-none py-1 px-3 w-[85%] mb-3 bg-red-700 text-white">
                CONSULTER
            </button>
        </div>
    );
}
