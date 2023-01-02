import React, { useState, useEffect } from 'react'
import Reservations from '../pages/Reservations'

export default function SearchBar({events} ) {
    const [searchResult, setSearchResult] = useState('')
    const [searchString, setSearchString] = useState('')

    function handleChangeSearch(el) {
        setSearchString(()=>el.target.value.trim())
    }
    
        useEffect(() => {
           // console.log(searchString.length);
          if (searchString.length > 1) {const res = events.filter(el => el.description.toLowerCase().includes(searchString))
            console.log(res);
            setSearchResult(res.length > 0 ? res : '')
        }else{setSearchResult('')}
         
        }, [searchString])
        
      
    
  return (
    <div className='fixed top-11 left-0 bottom-0 right-0'>
        
          <div className='relative w-3/4 max-w-3xl bg-red-200 top-1/4 
          xs:left-[13%]
          xl:left-[37%]'
          ><input type="text" />
                             {
                            searchResult && <div className="overflow-hidden ">
                                <Reservations searchResult={searchResult}/>
                            </div>}
        
                        </div>
    </div>
  )
}
