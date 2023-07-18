import React, { useContext } from 'react'
import NoteContext from '../context/notes/notesContext'

export default function AddNote() {
  const context = useContext(NoteContext);
  const {addNote} = context;
  const [note,setNote] = React.useState ({title:"",desc:"",tag:""})
  const handleClick = (ev)=>{
      ev.preventDefault();
      addNote(note.title,note.desc,note.tag);
      setNote({title:"",desc:"",tag:""});
    }
  const handleChange = (ev)=>{
     setNote((note)=>{
        return{
            ...note,
            [ev.target.name]:ev.target.value
        }
     })
  }
  return (
    <div>
         <div className='container my-3'>
            <h2>Add a Note</h2>
            <form className='my-3'>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input value={note.title} type="text" className="form-control my-3" id="title" name="title" placeholder="Enter Title" onChange={handleChange} minLength={3} required/>
            </div>
            <div className="form-group">
                <label htmlFor="desc">Description</label>
                <input value={note.desc} type="text" className="form-control my-3" id="desc" name="desc" placeholder="Enter Description" onChange={handleChange} minLength={3} required/>
            </div>
            <div className="form-group">
                <label htmlFor="tag">Tag</label>
                <input value={note.tag} type="text" className="form-control my-3" id="tag" name="tag" placeholder="Enter tag" onChange={handleChange} minLength={3} required/>
            </div>
            <button disabled={note.title.length<3||note.desc.length<3} type="submit" className="btn btn-primary my-3" onClick={handleClick}>AddNote</button>
            </form>
            </div>
    </div>
  )
}
