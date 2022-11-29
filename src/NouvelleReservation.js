import React from 'react'
import { useNavigate } from "react-router-dom";
import plus from './images/icons/+.svg'

export default function NouvelleReservation() {
  const navigate = useNavigate();
const handleClick = ()=> {
  let icon = document.getElementById('plus_icon')
  icon.classList.add('animate-ping')
  setTimeout(() => {
    
    icon.classList.remove('animate-ping')
    navigate("/resatest/nouvelle-reservation")
  }, 500);

}
  return (
    <div 
    className="w-60 text-center pt-3 cursor-pointer" 
    onClick={handleClick}
    >
        <img id='plus_icon' src={plus} alt="nouvelle reservation"  className='py-3 mx-auto'/>
        <p className='text-blue-900 font-bold text-xl ' tabIndex="0">Nouvelle <br/>Reservation</p></div>
  )
}
