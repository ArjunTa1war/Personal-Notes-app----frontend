import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope,faTrash,faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import NoteContext from '../context/notes/notesContext'

const element = <FontAwesomeIcon icon={faEnvelope} />

export default function NoteItem(props) {
  const {note,updatenote} = props
  const context = useContext(NoteContext);
  const {deleteNote} = context;
  return (
    <div className='col-md-3'>
    <div className="card my-3">
        <div className="card-body">
         <h5 className="card-title">{note.title}</h5>
        <p className="card-text">{note.description}.</p>
          <FontAwesomeIcon className="mx-2" icon={faTrash} onClick={()=>{deleteNote(note._id);props.showAlert("Deleted Successfully","success");}} style={{cursor:"pointer"}} />
          <FontAwesomeIcon className="mx-2"icon={faPenToSquare} onClick={()=>{updatenote(note)}} style={{cursor:"pointer"}} />
        </div>
    </div>
    </div>
  )
}
