import { useState } from 'react'
import Note from "./components/Note";

// const Note =({ note }) => {
//   return(
//     <li>{note.content}</li>
//   )
// }

const App = (props) => {
  const [notes, setNotes]  = useState(props.notes)
  // const result = notes.map(note => note.id)
  // console.log(result)
  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
  }
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        <li>{notes[0].content}</li>
        <li>{notes[1].content}</li>
        <li>{notes[2].content}</li>
      </ul>
      <hr></hr>
      <ul>
      {notes.map(note => 
      <Note key = {note.id} note = {note} />
      )}
      </ul>
      <form onSubmit ={addNote}>
      <input />
      <button type="submit">save</button>
      </form>
    </div>
  )
  
}

export default App
