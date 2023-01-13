import React, { useState, useEffect } from "react";

import searchIcon from "../images/icons/searchIcon.svg"

export default function SearchBar({ events, notes }) {
    const [searchResult, setSearchResult] = useState("");
    const [searchString, setSearchString] = useState("");

    function handleChangeSearch(el) {
        setSearchString(() => el.target.value.trim());
        
    }
    useEffect(() => {
        console.log(searchString.length);
        if (searchString.length > 1) {
            const Eventres = events.filter((el) => el.description.toLowerCase().includes(searchString));

            console.log(Eventres);
            setSearchResult(Eventres.length > 0 ? Eventres : "");
        } else {
            setSearchResult("");
        }
    }, [searchString]);

    return (
        <div className="absolute hidden h-full w-screen" id="searchBar_container">
            <div id="searchBar_curtain" className="absolute top-0 left-0 right-0 bottom-0 z-40 bg-slate-400 opacity-30" >
            </div>
            <div className="relative shadow-md rounded-md min-h-[400px] z-40 flex flex-col justify-start p-5 bg-white top-20 left-2/4 w-2/4 -translate-x-2/4 ">
                <div className="flex justify-start items-start align-bottom  border-b border-slate-300 w-full h-10">
                    <span
                        type="button"
                        id="search_close_button"
                        aria-label=""
                        className="absolute right-2 top-5 cursor-pointer border hover:border-slate-300 text-[10px] font-semibold text-slate-500 p-1 rounded-md "
                    >
                        ESC
                    </span>
                    <img src={searchIcon} alt="search icon" className="px-1 pt-1 mr-2 opacity-50" width="25" height="25" />
                    <input onChange={handleChangeSearch} type="text" className="relative outline-none" id="search_input" autoComplete="off" placeholder="Recherche rapide" />
                </div>
                <div>
                    <ul>

                    {searchResult ? searchResult.map((res, index)=> (
                        <li >
                            {index, res.description} resukl
                        </li> 
                    )): ''}
                    </ul>
                </div>
            </div>
        </div>
    );
}
