import React, { useContext, useEffect,useRef} from 'react'
import NoteContext from '../context/notes/notesContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';

export default function Notes() {
 const context = useContext(NoteContext);
 const {notes,getNotes,editNote} = context;
  useEffect(()=>{
      getNotes();
  },[])
  
  const [note,setNote] = React.useState ({id : "",title:"",description:"",tag:""})
  const handleClick = (ev)=>{
      ev.preventDefault();
      editNote(note.id,note.title,note.description,note.tag);
      refClose.current.click();
    }

  const handleChange = (ev)=>{
    setNote((note)=>{
       return{
           ...note,
           [ev.target.name]:ev.target.value
       }
    })
 }

  const ref = useRef(null);
  const refClose = useRef(null);
  const updatenote = (currentNote)=>{
     ref.current.click();
     setNote({id:currentNote._id,title:currentNote.title,description:currentNote.description,tag:currentNote.tag});
    }

  return (
    <>
    <AddNote />
    <button ref={ref}type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>

    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          <form className='my-3'>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input value={note.title} minLength={3} type="text" className="form-control my-3" id="title" name="title" placeholder="Enter Title" onChange={handleChange} required/>
            </div>
            <div className="form-group">
                <label htmlFor="desc">Description</label>
                <input value={note.description} minLength={3} type="text" className="form-control my-3" id="description" name="description" placeholder="Enter Description" onChange={handleChange} required/>
            </div>
            <div className="form-group">
                <label htmlFor="tag">Tag</label>
                <input value={note.tag} minLength={3} type="text" className="form-control my-3" id="tag" name="tag" placeholder="Enter tag" onChange={handleChange} required/>
            </div>
            </form>
          </div>
          <div className="modal-footer">
            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button disabled={note.title.length<3||note.description.length<3} type="button" onClick={handleClick} className="btn btn-primary">updatenote</button>
          </div>
        </div>
      </div>
    </div>

    <div className='row my-3'>
    <h2>Your Notes</h2>
    {notes.length===0&&<div className='container'>No Notes To Show</div>}
    {notes.map((note)=>{
      return (<NoteItem key={note._id} updatenote = {updatenote} note = {note}/>)
    })}
    </div>
    </>
  )
}
