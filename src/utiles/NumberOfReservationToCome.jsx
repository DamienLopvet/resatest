import React, { useState,useEffect, useContext } from "react";


export default function NumberOfReservationToCome( {eventList} ) {
    const [events, setEvents] = useState([])
    useEffect(() => {
      let date =  Date.now()
      let events_ = eventList.filter( (el) => new Date(el.start.dateTime).getTime() >= date);
      setEvents([...events_]);
     }, [eventList]);


  return (
    <div
    className="bg-white w-[142px] opacity-80 h-14 flex justify-around rounded"
    ><p className="text-bold text-xs self-center leading-3">Nombre de <br/> réservations <br/> à venir</p>
        <span className="text-4xl font-bold text-blue-500 self-center pb-1">{events.length}</span></div>
  )
}
