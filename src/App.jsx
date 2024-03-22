import { useState } from 'react'
import "./App.css";
import Note from "./components/Note";


// const Note =({ note }) => {
//   return(
//     <li>{note.content}</li>
//   )
// }

const App = (props) => {
  const [notes, setNotes]  = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  
  // const result = notes.map(note => note.id)
  // console.log(result)
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }
  
    setNotes(notes.concat(noteObject))
    setNewNote('')
  //console.log('button clicked', event.target)

  }
  const handleNoteChange = (event)=> {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important === true)
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        <li>{notes[0].content}</li>
        <li>{notes[1].content}</li>
        <li>{notes[2].content}</li>
      </ul>
      <hr></hr>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
      {notesToShow.map(note => 
      <Note key = {note.id} note = {note} />
      )}
      </ul>
      <form onSubmit ={addNote}>
      <input 
      value ={newNote}
      onChange={handleNoteChange}
       />
      <button type="submit">save</button>
      </form>
    </div>
  )
  
}

export default App
