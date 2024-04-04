import PropTypes from "prop-types";
import { createNewNote, updateNote } from "../Services/services";
import { useEffect } from "react";

export const AddNotes = ({
  importantNotes,
  setNotes,
  newNote,
  setNewNote,
  editing,
  setEditing,
}) => {
  const updateNoteHandler = (id, content, important) => {
    const updateNoteInfo = importantNotes.map((note) =>
      note.id === id ? { id, content, important } : note
    );
    setNotes(updateNoteInfo);
    setEditing(null);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!newNote) {
      return alert("Please add a note first!");
    }
    if (newNote.length < 2) {
      return alert("You can add a better note, Come on!");
    }
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    };
    if (!editing) {
      createNewNote(noteObject).then((res) =>
        setNotes(importantNotes.concat(res))
      );
      setNewNote("");
    } else {
      updateNote(editing.id, JSON.stringify(noteObject)).then((res) => {
        updateNoteHandler(res.id, res.content, res.important);
      });
    }
  };

  const clickHandlerCancel = () => {
    setNewNote("");
    setEditing(null);
  };

  useEffect(() => {
    if (editing) {
      setNewNote(editing.content);
    } else {
      setNewNote("");
    }
  }, [editing, setNewNote]);

  return (
    <div className="add-notes-div">
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          placeholder="Add a note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <input type="submit" value={editing ? "Edit Note" : "Submit"} />
      </form>
      {editing && <button onClick={clickHandlerCancel}>Cancel</button>}
    </div>
  );
};

AddNotes.propTypes = {
  importantNotes: PropTypes.array,
  setNotes: PropTypes.func,
  newNote: PropTypes.string,
  setNewNote: PropTypes.func,
  editing: PropTypes.object,
  setEditing: PropTypes.func,
};
