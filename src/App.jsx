import { useEffect, useState } from "react";
import { Notes } from "./Components/Notes";
import { getAllNotes } from "./Services/services";
import { AddNotes } from "./Components/AddNote";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [editing, setEditing] = useState(null);
  //const [del, setDel] = useState(false);

  useEffect(() => {
    getAllNotes()
      .then((res) => {
        setNotes(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const importantNotes = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div className="App">
      <h1>Notes</h1>
      {importantNotes.length > 0 && (
        <button className="show" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Important Notes" : "Show All Notes"}
        </button>
      )}
      <AddNotes
        importantNotes={importantNotes}
        setNotes={setNotes}
        newNote={newNote}
        setNewNote={setNewNote}
        editing={editing}
        setEditing={setEditing}
      />
      <Notes
        importantNotes={importantNotes}
        setNotes={setNotes}
        setNewNote={setNewNote}
        editing={editing}
        setEditing={setEditing}
        //del={del}
        //setDel={setDel}
      />
    </div>
  );
}

export default App;
