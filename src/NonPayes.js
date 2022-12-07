import React from 'react'

export default function NonPayes() {
  return (
    < div className='min-w-[250px] w-60 bg-white text-center pt-3'
    >
        <h3  className="font-bold text-xl text-slate-600 capitalize">Non Payés</h3>
        <p className='text-9xl font-bold text-red-700'>3</p>
        <p className='text-red-700 my-3'>LITS</p>
        <button className="rounded-none py-1 px-3 w-[85%] mb-3 bg-red-700 text-white">CONSULTER</button>
    </div>
  )
}
