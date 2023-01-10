import React, {useContext} from 'react'
import GetEvents from "../data/GetEvents";
import NouvelleReservationButton from '../utiles/NouvelleReservationButton';
import NonConnected from "../utiles/NonConnected";
import {UserContext} from "../UserContext";

export default function Transactions() {
  const {user} = useContext(UserContext);
  
  return (<div className='mt-28 ml-96 flex flex-row pr-4 justify-between'>
      <h1 className='text-4xl'>Transactions</h1>
        <NouvelleReservationButton />
        {!user.isLogged && <NonConnected/>}
  </div>
  )
}
