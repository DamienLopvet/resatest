import React, { useState, useEffect } from "react";
import Reservations from "../pages/Reservations";

export default function SearchBar({ events }) {
    const [searchResult, setSearchResult] = useState("");
    const [searchString, setSearchString] = useState("");

    function handleChangeSearch(el) {
        setSearchString(() => el.target.value.trim());
    }

    useEffect(() => {
        // console.log(searchString.length);
        if (searchString.length > 1) {
            const res = events.filter((el) => el.description.toLowerCase().includes(searchString));
            console.log(res);
            setSearchResult(res.length > 0 ? res : "");
        } else {
            setSearchResult("");
        }
    }, [searchString]);

    return (
        <div className="absolute hidden h-full w-screen" id="searchBar_container">
            <div className="absolute top-0 left-0 right-0 bottom-0 z-40" id="searchBar_curtain"></div>
            <div className="relative flex justify-center p-5 bg-red-300 top-1/4 left-2/4 w-2/4 -translate-x-2/4 translate-y-2/4"
                 >
                <input type="text" className="border"/>
               
            </div>
        </div>
    );
}
