import { useState, useEffect } from 'react'
import "./App.css";
import axios from'axios'
import Note from "./components/Note";
import noteService from './services/notes'


// const Note =({ note }) => {
//   return(
//     <li>{note.content}</li>
//   )
// }

const App = () => {
  const [notes, setNotes]  = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // const hook = () => {
  //   // console.log('effect')
  //   axios
  //     .get('http://localhost:3001/notes')
  //     .then(response => {
  //       // console.log('promise fulfilled')
  //       setNotes(response.data)
  //     })
  // }
// useEffect(hook,[])
    //  console.log('render', notes.length, 'notes')
   // const result = notes.map(note => note.id)
  // console.log(result)
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])
  const toggleImportanceOf = (id) => {
    // console.log('importance of ' + id + ' needs to be toggled')
// const url = `http://localhost:3001/notes/${id}`
const note = notes.find(n => n.id === id)
const changedNote = { ...note, important: !note.important }

noteService
    .update(id, changedNote)
    .then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
}
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      // id: notes.length + 1,
    }
    // axios
    // .post('http://localhost:3001/notes', noteObject)
    noteService
    .create(noteObject)
    .then(returnedNote => {
     setNotes(notes.concat(returnedNote))
     setNewNote('')
      // console.log(response)
    })
  //console.log('button clicked', event.target)
  }
  

  // axios.put(url, changedNote).then(response => {
  //   setNotes(notes.map(n => n.id !== id ? n : response.data))
  // })

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
      {/* <ul>
        <li>{notes[0].content}</li>
        <li>{notes[1].content}</li>
        <li>{notes[2].content}</li>
      </ul>
      <hr></hr> */}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
      {notesToShow.map(note => 
      <Note 
      key = {note.id} 
      note = {note}
      toggleImportance={() => toggleImportanceOf(note.id)} 
      />
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
