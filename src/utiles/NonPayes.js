import React, { useState, useEffect } from "react";

export default function NonPayes({ eventList }) {
    const [nonPaid, setNonPaid] = useState([]);
    useEffect(() => {
        const filteredEvents = eventList.filter(
            (event) => JSON.parse(event.description).paymentInfo == "Non_payé"
        );
        setNonPaid(() => filteredEvents);
        console.log(nonPaid);
    }, [eventList]);
    return (
        <div className="min-w-[250px] w-60 bg-white text-center pt-3">
            <h3 className="font-bold text-xl text-slate-600 capitalize">
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
            <button className="rounded-none py-1 px-3 w-[85%] mb-3 bg-red-700 text-white">
                CONSULTER
            </button>
        </div>
    );
}
