import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

export default function NombreReservation({ eventList }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [reservationByMonth, setReservationByMonth] = useState([]);
    const navigate = useNavigate();

    function handleDate(e) {
        if (e.target.value === "+") {
            let newDate = currentDate.setMonth(currentDate.getMonth() + 1);
            setCurrentDate(() => new Date(newDate));
            getNumberofReservation();
        } else if (e.target.value === "-") {
            let newDate = currentDate.setMonth(currentDate.getMonth() - 1);
            setCurrentDate(() => new Date(newDate));
            getNumberofReservation();
        }
    }
    useEffect(() => {
        getNumberofReservation();
    }, [eventList]);

    function getNumberofReservation() {
        let data = eventList.filter(
            (event) =>
                event.start.dateTime?.slice(0, 7) ===
                currentDate.toISOString().slice(0, 7)
        );
        setReservationByMonth(() => data);
    }

    return (
        <>
            <div
                id="nombre_reservation_card"
                className="min-w-[250px] w-60 bg-white text-center pt-3"
            >
                <div className="flex justify-around align-bottom">
                    <button
                        onClick={handleDate}
                        value="-"
                        className="text-slate-400 font-bold border-none hover:!shadow-none scale-y-150 hover:!text-slate-600 px-2"
                    >
                        &lt;
                    </button>
                    <h3 className="font-bold text-xl text-slate-600 capitalize">
                        {format(new Date(currentDate), " MMMM yyy", {
                            locale: fr,
                        })}
                    </h3>
                    <button
                        onClick={handleDate}
                        value="+"
                        className="text-slate-400 font-bold border-none hover:!shadow-none scale-y-150 hover:!text-slate-600 px-2"
                    >
                        &gt;
                    </button>
                </div>
                <div
                    id="nombre_de_reservation"
                    className="text-9xl font-bold text-blue-500 "
                >
                    {reservationByMonth.length}
                </div>
                <div className="text-blue-500 my-3">
                    RESERVATION{" "}
                    {reservationByMonth.length > 1 && (
                        <span className="-ml-1">S</span>
                    )}{" "}
                </div>
                <button
                    className="rounded-none py-1 px-3 w-[85%] mb-3 bg-blue-500 text-white"
                    onClick={() => navigate("/resatest/reservations")}
                >
                    VOIR PLUS
                </button>
            </div>
        </>
    );
}
