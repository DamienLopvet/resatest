import React, { useEffect, useState, useContext } from 'react'
import mailIcon from "../images/icons/mail.svg";
import phoneIcon from "../images/icons/phone.svg";
import identityIcon from "../images/icons/identity.svg";
import { UserContext } from "../UserContext";
import NonConnected from "../utiles/NonConnected";


export default function CarnetAdress({events} ) {
  const { user } = useContext(UserContext);

const [clientsFile, setClientsFile] = useState([])
const [sortState, setSortState] = useState("");
  
useEffect(() => {
  let clientsFile_ = []
 events.forEach(e=> {
  clientsFile_.push(JSON.parse(e.description))
}
)
setClientsFile(clientsFile_)
 },[events])

 function sortPeople() {
     setClientsFile([...clientsFile].sort((a, b) => a.Nom.toLowerCase() > b.Nom.toLowerCase() ? 1 :-1 ));
     setSortState("Nom du client")
 }

function sortEmail() {
  setClientsFile([...clientsFile].sort((a, b) => a.Email > b.Email ? 1 :-1 ));
  setSortState("Mail du client")
}

  return (
      <>
          <div className="xl:ml-[var(--xl-sidebar-w)] lg:ml-1 w-auto">
              <h1 className="xs:max-md:text-center mb-10 text-2xl font-bold ml-5">Carnet d'adresse</h1>

              <div className="mb-5 flex xs:justify-center md:!justify-between px-3">
                  <div className="relative flex flex-row flex-wrap gap-3">
                      <button
                          className="sort-button px-0 w-10 text-xs border-t-4 border-transparent rounded transition-all duration-500 "
                          onClick={sortPeople}
                      >
                          <img src={identityIcon} height="30" width="30" alt="transaction icon" className="mx-auto  hover:opacity-50" />
                      </button>

                      <button
                          className="sort-button px-0 w-10 text-xs border-t-4 border-transparent rounded transition-all duration-500 "
                          onClick={sortEmail}
                      >
                          <img src={mailIcon} height="30" width="30" alt="transaction icon" className="mx-auto  hover:opacity-50" />
                      </button>
                      <span className="absolute xs:max-md:left-1  left-0 -bottom-5 px-2 w-fit whitespace-nowrap text-xs bg-white rounded-t-lg">
                          {sortState}
                      </span>
                  </div>
              </div>
              <ul className="opacity-80 mx-3 rounded mb-10 xs:max-md:[&>:nth-child(2)]:rounded-t-xl">
                  <li className="rounded-tr leading-4 py-1 flex-row md:!flex justify-between gap-3 bg-white px-5 xs:hidden items-center">
                      <p className="font-bold xs:hidden md:!block  basis-[11%]">Nom Prénom</p>

                      <p className="font-bold xs:hidden md:!block  basis-[11%]">Téléphone</p>

                      <p className="font-bold  xs:hidden md:!block  basis-[11%]">Email</p>
                  </li>
                  {clientsFile.map((client, index) => (
                      <li
                          key={index}
                          id={"client_" + index}
                              className="flex flex-row justify-between gap-0
                              overflow-hidden  border-white  border-b-[1px]
                              transition-all duration-400
                              px-5  py-1 w-[100%]  m-0 max-w-none
                              md:h-[60px] 
                              last:!rounded-b-xl 
                            odd:bg-white
                            even:bg-slate-300
                            xs:max-md:flex-col
                            xs:max-md:border
                            xs:max-md:mx-auto
                            xs:max-md:my-[3px]
                            xs:max-md:w-[95%]
                            xs:max-md:py-3
                            xs:max-md:max-w-sm
                            xs:max-md:gap-3
               "
                      >
                          <div id="client_info" className="flex gap-2 basis-[11%]">
                              <img
                                  src={identityIcon}
                                  alt="identity icon"
                                  title="Nom Prénom"
                                  width="15"
                                  height="15"
                                  className="md:hidden pr-2 mr-2 w-10 border-r-2 border-slate-400 "
                              />
                              <div className="capitalize min-w-[110px]">
                                  <p className="overflow-ellipsis overflow-hidden whitespace-nowrap ">{client.Nom || "pas de nom"}</p>
                                  <p className="overflow-ellipsis overflow-hidden whitespace-nowrap">{client.Prenom || "pas de Prenom"}</p>
                              </div>
                          </div>

                          <div
                              id="phone_info"
                              className="overflow-ellipsis overflow-hidden whitespace-nowrap flex flex-row gap-2 basis-[11%] items-center"
                          >
                              <div>
                                  <img
                                      src={phoneIcon}
                                      alt="phone icon"
                                      width="15"
                                      height="15"
                                      title="Téléphone"
                                      className="md:hidden  w-10 h-6 mr-2 pr-2 border-r-2 border-slate-400"
                                  />
                              </div>

                              <div>
                                  {client.Tel ? (
                                      <a href="tel:{ParsedClientInfo(event.description).Tel}">{client.Tel}</a>
                                  ) : (
                                      <span className="line-through">Téléphone</span>
                                  )}
                              </div>
                          </div>
                          <div id="email_info" className="overflow-ellipsis overflow-hidden whitespace-nowrap flex flex-row gap-2  basis-[11%]">
                              <div>
                                  <img
                                      src={mailIcon}
                                      alt="mail icon"
                                      width="15"
                                      height="15"
                                      title="Email"
                                      className="md:hidden  w-10 h-5 mb-1 mr-2 pr-2 border-r-2 border-slate-400"
                                  />
                              </div>

                              <div className="overflow-ellipsis overflow-hidden whitespace-nowrap max-w-xs flex flex-row justify-start items-center gap-2">
                                  {client.Email ? (
                                      <a href="mailto:{ParsedClientInfo(event.description).Email}">{client.Email}</a>
                                  ) : (
                                      <span className="line-through">Email</span>
                                  )}
                              </div>
                          </div>
                      </li>
                  ))}
              </ul>
              {!user.isLogged && <NonConnected />}
          </div>
      </>
  );}
