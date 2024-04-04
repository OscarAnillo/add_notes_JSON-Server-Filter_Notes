//import { useState } from "react";
//import axios from "axios";
import PropTypes from "prop-types";
import { deleteService } from "../Services/services";

export const Notes = ({
  importantNotes,
  setNotes,
  setNewNote,
  editing,
  setEditing,
  /* del, 
  setDel */
}) => {
  /* 1st way to delete a note */
  // const clickHandler = (id) => {
  //   axios
  //     .delete(`http://localhost:3001/notes/${id}`)
  //     .then(() => {
  //       setDel(!del);
  //     })
  //     .catch((err) => console.log(err));
  // };

  /* 2nd way to delete a note */
  const clickHandlerDelete = (id) => {
    deleteService(id);
    const newNotes = importantNotes.filter((note) => note.id !== id);
    setNotes(newNotes);
    if (editing) {
      setNewNote("");
      setEditing(null);
    }
  };

  const clickHandlerEdit = (id) => {
    const findNote = importantNotes.find((note) => note.id === id);
    setEditing(findNote);
  };

  return (
    <div className="notes-div">
      {importantNotes.length > 0 ? (
        importantNotes?.map((note) => (
          <div key={note.id}>
            <li>{note.content}</li>
            <div>
              <button
                className="btn delete"
                onClick={() => clickHandlerDelete(note.id)}
              >
                Clear Note
              </button>
              <button
                className="btn edit"
                onClick={() => clickHandlerEdit(note.id)}
              >
                Edit Note
              </button>
            </div>
          </div>
        ))
      ) : (
        <h1>You can start adding notes!</h1>
      )}
    </div>
  );
};

Notes.propTypes = {
  importantNotes: PropTypes.array,
  setNotes: PropTypes.func,
  setNewNote: PropTypes.func,
  del: PropTypes.bool,
  setDel: PropTypes.func,
  editing: PropTypes.object,
  setEditing: PropTypes.func,
};
