import React from "react";
import "./styles/main.css";
import damien from"./assets/user/profile-2.png" 

export default function Home() {
    return (
        <>
            <div className="top-nav mt-10 py-3 bg-white flex justify-between">
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
                        stroke-linecap="round"
                        stroke-miterlimit="10"
                        stroke-width="2"
                        d="M4 7h22M4 15h22M4 23h22"
                    ></path>
                </svg>
                <div className="search-bar relative">

                  <input
                      type="text"
                      className="w-4/5 py-1 px-1 ml-3 outline-none bg-white focus:border-2 focus:border-blue-500 "
                      placeholder="rechercher par noms, prénoms, dates..."
                  /><svg width="15" className="absolute top-2 right-9" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="magnifying-glass" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"></path></svg>
                </div>
                <a
                    className="relative"
                    id="notifications-dropdown-toggle"
                    data-bs-toggle="dropdown"
                    href="#"
                    role="button"
                    aria-expanded="false"
                    title="Notifications"
                >
                    <svg
                        width="2em"
                        height="2em"
                        viewBox="0 0 16 16"
                        className=""
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2z"></path>
                        <path
                            fill-rule="evenodd"
                            d="M8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"
                        ></path>
                    </svg>
                    <span className="icon-badge absolute top-0 right-0 border text-xs px-1 rounded-full bg-[#ec776c] text-white border-white ">
                        3
                    </span>
                </a>
                <div className="app-utility-item">
                    <a href="settings.html" title="Settings">
                        <svg
                            width="2em"
                            height="2em"
                            viewBox="0 0 16 16"
                            className=""
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 0 1 4.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 0 1-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 0 1 1.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 0 1 2.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 0 1 2.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 0 1 1.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 0 1-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 0 1 8.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 0 0 1.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 0 0 .52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 0 0-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 0 0-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 0 0-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 0 0-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 0 0 .52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 0 0 1.255-.52l.094-.319z"
                            ></path>
                            <path
                                fill-rule="evenodd"
                                d="M8 5.754a2.246 2.246 0 1 0 0 4.492 2.246 2.246 0 0 0 0-4.492zM4.754 8a3.246 3.246 0 1 1 6.492 0 3.246 3.246 0 0 1-6.492 0z"
                            ></path>
                        </svg>
                    </a>
                </div>
                <div className="">
				            <a className="dropdown-toggle" id="user-dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false"><img src={damien} alt="user profile" width="40" height="40"  className="mr-2"/></a>
				            <ul className="dropdown-menu hidden" aria-labelledby="user-dropdown-toggle">
								<li><a className="dropdown-item" href="account.html">Compte</a></li>
								<li><a className="dropdown-item" href="settings.html">Parametres</a></li>
								<li><hr className="dropdown-divider" /></li>
								<li><a className="dropdown-item" href="login.html">Se deconnecter</a></li>
							</ul>
			            </div>
            </div>
        </>
    );
}
