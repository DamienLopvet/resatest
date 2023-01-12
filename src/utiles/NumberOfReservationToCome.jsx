import GetEvents from "../data/GetEvents";
import React, { useState,useEffect, useContext } from "react";
import { UserContext } from "../UserContext.js" 


export default function NumberOfReservationToCome() {
    const [eventList, setEventList] = useState([])
    const {user} = useContext(UserContext);
  
    useEffect(() => {
         GetEvents('now', user).then((e)=> setEventList(e))
     }, [user]);


  return (
    <div
    className="bg-white w-[142px] opacity-80 h-14 flex justify-around rounded"
    ><p className="text-bold text-xs self-center leading-3">Nombre de <br/> réservations <br/> à venir</p>
        <span className="text-6xl font-bold text-blue-500 self-center pb-1">{eventList.length}</span></div>
  )
}
