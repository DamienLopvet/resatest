import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route, Routes, useNavigate } from "react-router-dom";
import LoadUser from "./data/LoadUser";
import "./styles/header.css";

export default function Header() {
    const [isActiveTab, setIsActiveTab] = useState("1");
    const loadUser = LoadUser();
    const navigate = useNavigate();
    

    function handleActiveTab(e) {
        let tabTodisable = document.querySelector(
            `[data-index="${isActiveTab}"]`
        );
        let tabToActivate = e.currentTarget;
        tabTodisable.classList.remove("active");
        setIsActiveTab(tabToActivate.dataset.index);
        tabToActivate.classList.add("active");
        handleSidebar("hideSidebar");
    }
    function handleSidebar(e) {
        let sidebar = document.getElementById("sidebar");
        let curtain = document.getElementById("curtain");
        let closeButton = document.getElementById("curtain_close_button");
        if (
            e.target?.id === "curtain" ||
            e.target?.id === "curtain_close_button" ||
            e.keyCode === 27 ||
            e.keyCode === 8 ||
            e === "hideSidebar"
        ) {
            sidebar.style.transform = "translateX(-20rem)";
            curtain.style.display = "none";
            closeButton.style.display = "none";
            curtain.removeEventListener("click", handleSidebar);
            closeButton.removeEventListener("click", handleSidebar);
            document.removeEventListener("keydown", handleSidebar);
        } else {
            sidebar.style.transform = "translateX(0rem)";
            curtain.style.display = "block";
            closeButton.style.display = "block";
            curtain.addEventListener("click", handleSidebar);
            closeButton.addEventListener("click", handleSidebar);
            document.addEventListener("keydown", handleSidebar);
        }
    }
   

    return (
        <>
            <div className="">
                <div
                    id="curtain"
                    className="h-[96vh] w-screen bg-slate-600 absolute z-20 opacity-30 hidden top-0"
                ></div>
                <span
                    id="curtain_close_button"
                    aria-label="close"
                    className="left-[calc(var(--sidebar-w)+1rem)] z-30 text-white text-6xl rotate-45 cursor-pointer absolute top-0 hidden"
                >
                    +
                </span>
                <div
                    id="sidebar"
                    className="top-0 z-30 overflow-auto transition duration-300 xl:!translate-x-0  xs:-translate-x-80 flex  xs:w-[var(--sidebar-w)] xl:!w-[var(--xl-sidebar-w)] bg-white fixed h-screen flex-col justify-between border-r-2 border-slate-400 shadow-xl"
                >
                    <div id="sidebar_main " className="">
                        <h2 className="text-3xl font-bold mb-10 mt-5 ml-2">
                            Le pont du Lit
                        </h2>
                        <ul
                            className="app-menu list-unstyled accordion"
                            id="menu-accordion"
                        >
                            <Link to="/resatest/">

                            <li
                                id="sidenav_vue_d_ensemble"
                                className="nav-item"
                            >
                                <div
                                    data-index="1"
                                    onClick={handleActiveTab}
                                    className="nav-link nav-link hover:text-[#3e5c8c] flex flex-row gap-5 justify-start items-end p-3 active"
                                >
                                    <span className="nav-icon">
                                        <svg
                                            width="1.5rem"
                                            height="1.5rem"
                                            viewBox="0 0 16 16"
                                            className="bi bi-house-door"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M7.646 1.146a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5H9.5a.5.5 0 0 1-.5-.5v-4H7v4a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6zM2.5 7.707V14H6v-4a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4h3.5V7.707L8 2.207l-5.5 5.5z"
                                            ></path>
                                            <path
                                                fillRule="evenodd"
                                                d="M13 2.5V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                                            ></path>
                                        </svg>
                                    </span>
                                    <span className="text-sm">
                                            Vue d'ensemble
                                    </span>
                                </div>
                            </li>
                                        </Link>
                        <Link to="/resatest/reservations">

                            <li id="sidenav_reservation" className="nav-item" >
                                <div
                                    data-index="2"
                                    onClick={handleActiveTab}
                                    className="nav-link hover:text-[#3e5c8c] flex flex-row gap-5 justify-start items-end p-3"
                                >
                                    <span className="nav-icon">
                                        <svg
                                            width="1.5rem"
                                            height="1.5rem"
                                            viewBox="0 0 16 16"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"
                                            ></path>
                                            <path
                                                fillRule="evenodd"
                                                d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z"
                                            ></path>
                                            <circle
                                                cx="3.5"
                                                cy="5.5"
                                                r=".5"
                                            ></circle>
                                            <circle
                                                cx="3.5"
                                                cy="8"
                                                r=".5"
                                            ></circle>
                                            <circle
                                                cx="3.5"
                                                cy="10.5"
                                                r=".5"
                                            ></circle>
                                        </svg>
                                    </span>
                                    <span className="nav-link-text text-sm">
                                        Reservations
                                    </span>
                                </div>
                            </li>
                        </Link>
                                        <Link to="/resatest/calendrier">
                            <li id="sidenav_calendrier" className="nav-item">
                                <div
                                    data-index="3"
                                    onClick={handleActiveTab}
                                    className="nav-link hover:text-[#3e5c8c] flex flex-row gap-5 justify-start items-end p-3"
                                >
                                    <span className="nav-icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="1.5rem"
                                            height="1.5rem"
                                            fill="currentColor"
                                            className="bi bi-calendar"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"></path>
                                        </svg>
                                    </span>
                                    <span className="nav-link-text text-sm">
                                        Calendrier
                                    </span>
                                </div>
                            </li>
                            </Link>
                            <Link to="/resatest/transactions">
                            <li
                                id="sidenav_transactions"
                                className="nav-item   hover:text-[#3e5c8c] h-[45px] duration-500 overflow-hidden"
                            >
                                <div
                                    className="sidenav-item-title flex flex-row gap-5 justify-start items-end p-3"
                                    data-index="5"
                                    onClick={handleActiveTab}
                                >
                                    <span className="nav-icon">
                                        <svg
                                            width="1.5rem"
                                            height="1.5rem"
                                            viewBox="0 0 16 16"
                                            className="bi bi-columns-gap"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M6 1H1v3h5V1zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H1zm14 12h-5v3h5v-3zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-5zM6 8H1v7h5V8zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H1zm14-6h-5v7h5V1zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1h-5z"
                                            ></path>
                                        </svg>
                                    </span>
                                    <div
                                        className="submenu-link text-sm"
                                    >
                                        Transactions
                                    </div>
                                </div>
                            </li>
                            </Link>
                            <li
                                id="sidenav_carnet_d_adresses"
                                className="nav-item "
                            >
                                <div
                                    data-index="6"
                                    onClick={handleActiveTab}
                                    className="nav-link hover:text-[#3e5c8c] flex flex-row gap-5 justify-start items-end p-3"
                                >
                                    <span className="nav-icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="1.5rem"
                                            height="1.5rem"
                                            fill="currentColor"
                                            className="bi bi-book"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"></path>
                                        </svg>
                                    </span>
                                    <span className="nav-link-text text-sm">
                                        Carnet d'adresses
                                    </span>
                                </div>
                            </li>
                            <li id="sidenav_notes" className="nav-item">
                                <div
                                    data-index="7"
                                    onClick={handleActiveTab}
                                    className="nav-link hover:text-[#3e5c8c] flex flex-row gap-5 justify-start items-end p-3"
                                >
                                    <span className="nav-icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="1.5rem"
                                            height="1.5rem"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2ZM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4Zm7.5.5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7ZM2 5.5a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1-.5-.5ZM10.5 5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3ZM13 8h-2V6h2v2Z"
                                            ></path>
                                        </svg>
                                    </span>
                                    <span className="nav-link-text text-sm">
                                        Notes
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div id="sidebar_footer">
                        <ul className="mb-10">
                            <li className="nav-item">
                                <div
                                    className="nav-link hover:text-[#3e5c8c] flex flex-row gap-5 justify-start items-end p-3"
                                >
                                    <span className="nav-icon">
                                        <svg
                                            width="1.5rem"
                                            height="1.5rem"
                                            viewBox="0 0 16 16"
                                            className="bi bi-gear"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 0 1 4.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 0 1-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 0 1 1.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 0 1 2.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 0 1 2.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 0 1 1.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 0 1-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 0 1 8.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 0 0 1.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 0 0 .52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 0 0-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 0 0-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 0 0-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 0 0-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 0 0 .52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 0 0 1.255-.52l.094-.319z"
                                            ></path>
                                            <path
                                                fillRule="evenodd"
                                                d="M8 5.754a2.246 2.246 0 1 0 0 4.492 2.246 2.246 0 0 0 0-4.492zM4.754 8a3.246 3.246 0 1 1 6.492 0 3.246 3.246 0 0 1-6.492 0z"
                                            ></path>
                                        </svg>
                                    </span>
                                    <span className="nav-link-text text-sm">
                                        Settings
                                    </span>
                                </div>
                            </li>

                            <li className="nav-item">
                                <div
                                    className="nav-link hover:text-[#3e5c8c] flex flex-row gap-5 justify-start items-end p-3"
                                >
                                    <span className="nav-icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="1.5rem"
                                            height="1.5rem"
                                            fill="currentColor"
                                            className="bi bi-patch-question"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M8.05 9.6c.336 0 .504-.24.554-.627.04-.534.198-.815.847-1.26.673-.475 1.049-1.09 1.049-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.71 1.71 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745z"></path>
                                            <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"></path>
                                            <path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0z"></path>
                                        </svg>
                                    </span>
                                    <span className="nav-link-text text-sm">
                                        Besoin d'aide?
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div
                    id="top-navbar"
                    className="z-10 py-2 bg-white flex justify-between gap-[10px] items-center sm:col-span-5 xl:ml-[20rem] shadow fixed top-0 right-0 left-0"
                >
                    <div id="burger_menu"
                        className="mr-auto ml-3 cursor-pointer xl:hidden"
                        onClick={handleSidebar}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            role="img"
                        >
                            <title>Menu</title>
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeMiterlimit="10"
                                strokeWidth="2"
                                d="M4 7h22M4 15h22M4 23h22"
                            ></path>
                        </svg>
                    </div>
                    <div id="search-bar" className="relative w-3/4 group">
                        <input
                            type="text"
                            className="lg:ml-6 w-full py-2 px-3 mr-3 outline-none bg-white focus:border-2 text-sm focus:border-blue-500 placeholder-slate-600 border-slate-300 border"
                            placeholder="rechercher par noms, prénoms, dates..."
                        />
                        <svg
                            width="15"
                            className="absolute top-3 right-3 opacity-60 group-hover:opacity-100 "
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="magnifying-glass"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            data-fa-i2svg=""
                        >
                            <path
                                fill="currentColor"
                                d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"
                            ></path>
                        </svg>
                    </div>
                    <div className="notifications relative ml-auto ">
                        <div
                            className=" text-black opacity-60 hover:opacity-100"
                            id="notifications-dropdown-toggle"
                            data-bs-toggle="dropdown"
                            role="button"
                            aria-expanded="false"
                            title="Notifications"
                        >
                            <svg
                                width="1.7em"
                                height="1.7em"
                                viewBox="0 0 16 16"
                                className=""
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2z"></path>
                                <path
                                    fillRule="evenodd"
                                    d="M8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"
                                ></path>
                            </svg>
                        </div>
                        <span className="absolute opacity-100 z-10 icon-badge  -top-1.5 -right-1.5 border-2 text-xs px-1 rounded-full bg-[#ec776c] text-white border-white ">
                            3
                        </span>
                    </div>
                    <div className="ml-5 mr-16">
                        <div
                            title="Settings"
                            className="text-black opacity-60 hover:opacity-100"
                        >
                            <svg
                                width="1.7em"
                                height="1.7em"
                                viewBox="0 0 16 16"
                                className=""
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 0 1 4.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 0 1-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 0 1 1.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 0 1 2.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 0 1 2.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 0 1 1.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 0 1-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 0 1 8.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 0 0 1.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 0 0 .52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 0 0-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 0 0-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 0 0-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 0 0-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 0 0 .52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 0 0 1.255-.52l.094-.319z"
                                ></path>
                                <path
                                    fillRule="evenodd"
                                    d="M8 5.754a2.246 2.246 0 1 0 0 4.492 2.246 2.246 0 0 0 0-4.492zM4.754 8a3.246 3.246 0 1 1 6.492 0 3.246 3.246 0 0 1-6.492 0z"
                                ></path>
                            </svg>
                        </div>
                    </div>
                    <div className="relative">
                        <div id="divSignin" className="absolute -bottom-5  right-3"></div>

                        {loadUser.userThumbnail && (
                            <img
                                src={loadUser.userThumbnail}
                                alt="user thumbnail"
                                width="40"
                                height="40"
                                className="absolute -bottom-5  right-3 cursor-pointer max-w-none rounded-lg"
                                onClick={loadUser.logOut}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
