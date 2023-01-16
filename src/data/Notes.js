
export default function Notes() {
    let parsedNotes = JSON.parse(localStorage.getItem('notes'))
 
 if(parsedNotes?.length){return parsedNotes }

  
 
}
