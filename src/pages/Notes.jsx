import React, { useState, useContext } from 'react'
import { UserContext } from "../UserContext" 

//icons
import DeleteButton from '../images/icons/Delete-button.svg'
import NonConnected from '../utiles/NonConnected';

export default function Notes() {
const {user} = useContext(UserContext);

const [undoBox, setUndoBox] = useState(false)
const notes = ["Lorem ipsum dolor sit amet", "consectetur adipisicing elit", "Quaerat impedit fugit quasi omnis maxime ut voluptas sed", "dolores saepe nobis perspiciatis repellat esse", "at cumque. Nisi ut deserunt recusandae facilis." ]
var timeout
var noteToDelete;
function handleDelete(arg, index) {
  const undoBox= document.querySelector('#confirm_or_undo')
  if(index)console.log(index);
  if(arg === "set") {
   noteToDelete = document.querySelector('#li_note_'+index)
   noteToDelete.style.display = 'none'
  undoBox.style.transform = "translate(0)"
  timeout = window.setTimeout(() => {
  undoBox.style.transform = "translate(-800px)"

   }, 5000);}
else{
   window.clearTimeout(timeout)
  undoBox.style.transform = "translate(-800px)"
   noteToDelete.style.display = 'flex'

  }}


function handleDone(index){
 let noteToStrike = document.querySelector('#text_note_'+index)
 noteToStrike.classList.toggle('line-through')
}



  return (
    <div className='xl:ml-[var(--xl-sidebar-w)] lg:ml-1 w-auto'>
        <ul className='w-2/4 bg-white min-w-fit' >
    {notes.map((note, index)=>(
        <li key={index} id={"li_note_"+ index } className="flex flex-row justify-start gap-2 border-b p-1">
          <div contenteditable="true" id={"text_note_"+index} className="mx-2 max-w-[300px]">{note}</div>
        <div className='ml-auto flex flex-row gap-2 mr-2'>
          <button onClick={()=>handleDone(index) }> done</button>
          <img src={DeleteButton} role="button" alt="delete" height="15" width="15" onClick={() =>handleDelete("set", index )} />
        </div>
        </li>

    )) }

        </ul>
            <div id="confirm_or_undo" className="transition duration-200 -translate-x-[800px] w-60 border bg-white h-content justify-start flex flex-col gap-3 rounded-md shadow m-3" > 
            <p>La note a bien été supprimée </p>
            <button className='border-slate-400 bg-red-300 w-12 rounded m-2 '
             onClick={() =>handleDelete("clear")}>undo</button> 
            </div>
             {!user.isLogged && <NonConnected/>}
    </div>
  )
}
