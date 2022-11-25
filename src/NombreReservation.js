import React, { useState, useEffect } from "react";
import "./styles/App.css";
import { useNavigate } from "react-router-dom";
import { format, setDate } from "date-fns";
import { fr } from "date-fns/locale";

export default function NombreReservation({ eventList }) {
    const navigate = useNavigate();
    const [response, setResponse] = useState("");
    const [error, setError] = useState("");
    const [currentDate, setCurrentDate] = useState(new Date());
    const [reservationByMonth, setReservationByMonth] = useState([]);

    console.log(currentDate.toISOString().slice(0, 7));

    function handleDate(e) {
        if (e.target.value == "+") {
            let newDate = currentDate.setMonth(currentDate.getMonth() + 1);
            setCurrentDate(() => new Date(newDate));
            getNumberofReservation();
        }else if(e.target.value == "-") {
            let newDate = currentDate.setMonth(currentDate.getMonth() - 1);
            setCurrentDate(() => new Date(newDate));
            getNumberofReservation();
        }
    }
    useEffect(() => {
        getNumberofReservation();
    }, [eventList]);

    function getNumberofReservation() {
        console.log(eventList);
        let data = eventList.filter(
            (event) =>
                event.start.dateTime?.slice(0, 7) ==
                currentDate.toISOString().slice(0, 7)
        );
        setReservationByMonth(() => data);
        console.log(" resaByMonth", reservationByMonth.length);
    }

    return (
        <>
            <p>{format(new Date(currentDate), " MMMM yyy", { locale: fr })}</p>
            <button onClick={handleDate} value="-">
                -
            </button>

            {reservationByMonth.length}
            <button onClick={handleDate} value="+">
                +
            </button>
        </>
    );
}
