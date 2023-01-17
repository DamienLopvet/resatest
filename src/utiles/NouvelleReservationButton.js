import React from 'react'
import { useNavigate } from "react-router-dom";
import plus from '../images/icons/+.svg'

export default function NouvelleReservationButton() {
  const navigate = useNavigate();
  const handleClick = ()=> {
    let icon = document.getElementById('plus_icon')
    icon.classList.add('animate-ping')
    setTimeout(() => {
      
      icon.classList.remove('animate-ping')
      navigate("/resatest/nouvelle-reservation")
    }, 250);
  
  }
    return (
      <div 
      className="w-36 h-14 
      xs:max-md:ml-2 cursor-pointer 
      flex flex-row items-center justify-around 
      border border-slate-400 shadow-md bg-blue-500 rounded hover:bg-blue-400
      " 
      onClick={handleClick}
      >
          <img id='plus_icon' src={plus} alt="nouvelle reservation"  className='w-8 xs:max-sm:hidden'/>
          <p className='text-white font-bold text-md
          xs:max-sm:text-center xs:max-sm:text-xs' tabIndex="0">Nouvelle <br/>Reservation</p></div>
    )
}
