import React, { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from "../UserContext";

//icons
import DeleteButton from "../images/icons/Delete-button.svg";
import NonConnected from "../utiles/NonConnected";

export default function Notes({notes, setNotes} ) {
    const { user } = useContext(UserContext);
    const [storeNote, setStoreNote] = useState({})
    const timeout = useRef(null);

   useEffect(() => {
     document.querySelectorAll('textarea').forEach(e=>{
        e.style.height = 'auto';
        e.style.height = e.scrollHeight + 'px';
     })
   }, [notes])
   

    function handleDelete(arg, index) {
        const undoBox = document.querySelector("#confirm_or_undo");
        if (arg === "setTimeout") {
            let noteToStore = document.querySelector("#text_note_" + index).value;
            setStoreNote({index:index, toReplace : 0 , note: {terminated: false , content :noteToStore}})
            undoBox.style.transform = "translate(0)";
            let notes_ = [...notes];
            console.log(notes_);
            notes_.splice(index, 1);
            setNotes(()=>  {return [...notes_]});
            timeout.current = window.setTimeout(() => {
                undoBox.style.transform = "translate(-800px)";
            }, 5000);
        } else {
            let notes_ = [...notes];
                        console.log(notes_);

            notes_.splice(storeNote.index, storeNote.toReplace, storeNote.note);
            console.log(notes_);
            setNotes(()=>  {return [...notes_]});
            clearTimeout(timeout.current);
            timeout.current = null
            undoBox.style.transform = "translate(-800px)";
        }
    }

    function handleDone(index) {
       let notes_ = notes
       notes_.map((e, idx) => {
        if(idx === index)e.terminated = !e.terminated;
        return e;
       })
       console.log(notes_);
       setNotes([...notes_]);
    }

 
    function handleNoteChanges(e) {
        let newNote ={terminated:false, content: e.target.value};
        let idx = parseInt(e.target.id.split("_")[2])
        console.log(newNote);
        console.log(e.data);
        let notes_ = notes
        notes_.splice(idx, 1, newNote)
        setNotes([...notes_])
    }
    function addNote() {
      setNotes(()=>{return [ {terminated:false, content:''},...notes]}) 

      setTimeout(() => {
        document.getElementById('text_note_0').setAttribute('placeholder','Entrez votre texte ici')
      
        document.getElementById('text_note_0').focus()
          
      }, 300);
       
        
    
    }

    return (
        <div className="xl:ml-[var(--xl-sidebar-w)] lg:ml-1 w-auto">
            <button onClick={addNote} className="bg-slate-100 m-3 p-2 rounded hover:border-slate-400 border shadow-xl">Ajouter une note</button>
            <ul className=" bg-white min-w-fit mx-3 rounded">
                {notes && notes.map((note, index) => (
                    <li key={index} id={"li_note"} className="flex flex-row justify-start gap-2 border-b p-1">
                        <textarea
                            onChange={handleNoteChanges}
                            value={note.content}
                            id={"text_note_" + index}
                            className={(note.terminated ? "line-through " : "") + "outline-0 break-words placeholder:text-slate-600 cursor-pointer mx-2 resize xs:max-sm:w-[60%] w-full"}
                        />
                           
                        

                        <div className="ml-auto flex flex-row gap-2 mr-2 ">
                                <div className="w-22 flex flex-col justify-center gap-1" >
                                    <button
                                        onClick={() => handleDone(index)}
                                        className="text-xs border h-5 p-1 leading-[0.2] rounded hover:shadow self-center"
                                    >
                                        terminé
                                    </button>
                                </div>
                            <img
                                className="hover:drop-shadow"
                                src={DeleteButton}
                                role="button"
                                alt="delete"
                                height="15"
                                width="15"
                                onClick={() => handleDelete("setTimeout", index)}
                            />
                        </div>
                    </li>
                ))}
            </ul>
            <div
                id="confirm_or_undo"
                className="fixed bottom-0 -translate-x-[800px] transition duration-200  w-60  bg-slate-800 h-content items-center flex flex-col gap-3 rounded-md shadow m-3"
            >
                <p className="text-white px-1">La note a bien été supprimée </p>
                <button className="border-slate-400 bg-red-300 w-12 rounded m-2 " onClick={() => handleDelete("clear")}>
                    undo
                </button>
            </div>
            {!user.isLogged && <NonConnected />}
        </div>
    );
}