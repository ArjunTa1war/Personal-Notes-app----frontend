import React from "react";

import NoteContext from "./notesContext";
const NoteState = (props)=>{

const host = "http://localhost:4000"
const[notes,setNotes] = React.useState([]);

/************************************************Get all NOTE FUNCTION********************************/

const getNotes = async()=>{
  /*******API CALL*********/
  const response = await fetch(`${host}/api/notes/fetchallnotes`,{
    method : "GET",
    headers:{
      'Content-Type':"application/json",
      "auth-token" : localStorage.getItem('token')
    }
  })

  /*******Change in client sideL*********/
  const json = await response.json();
  setNotes(json);
}

/*************************************************ADD NOTE FUNCTION***********************************/

  const addNote  = async(title,description,tag)=>{
    /*******API CALL*********/
    const response = await fetch(`${host}/api/notes/addnote`,{
      method : "POST",
      headers:{
        'Content-Type':"application/json",
        "auth-token" : localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag})
    })
    const json = await response.json();

    /*******Change in client sideL*********/
    setNotes(notes.concat(json));
  }

/************************************************DELETE NOTE FUNCTION***********************************/

  const deleteNote = async(id)=>{
    /*******API CALL*********/
    const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
      method : "DELETE",
      headers :{
        'Content-Type':"application/json",
        'auth-token':localStorage.getItem('token')
      },
     })
     const json = await response.json();
    /*******Change in client sideL*********/
    const newNote = notes.filter((note)=>{return note._id!==id})
    setNotes(newNote);
  }


  /***********************************************EDIT NOTE*********************************************/

  const editNote = async(id,title,description,tag)=>{ 
     /*******API CALL*********/
     const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
      method : "PUT",
      headers :{
        'Content-Type':"application/json",
        'auth-token':localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag})
     })
     const json = await response.json();
     /*******Change in client sideL*********/
     let newnotes = JSON.parse(JSON.stringify(notes));
     for (let index = 0; index < notes.length; index++) {
      if(newnotes[index]._id===id){
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tag = tag;
        break;
      }
     }
     setNotes(newnotes);
  }

  return (    
    <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}> 
       {props.children}
    </NoteContext.Provider>
  )
}
 
export default NoteState;