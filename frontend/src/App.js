import { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [lastSaved, setLastSaved] = useState("");

  const API = "http://localhost:5000";

  useEffect(() => {
  const createIfEmpty = async () => {
    if (!selectedId && (title || content)) {
      const res = await axios.post(`${API}/notes`, {
        title: title || "Untitled",
        content: content || "",
      });

      setSelectedId(res.data.id);
      fetchNotes();
    }
  };

  createIfEmpty();
}, [title, content]);

  
  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${API}/notes`);
      setNotes(res.data);

      if (res.data.length > 0 && !selectedId) {
        const first = res.data[0];
        setSelectedId(first.id);
        setTitle(first.title);
        setContent(first.content);
        setLastSaved(first.title + first.content);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  
  useEffect(() => {
    if (!selectedId) return;

    const currentData = title + content;
    if (currentData === lastSaved) return;

    const timeout = setTimeout(() => {
      axios.put(`${API}/notes/${selectedId}`, {
        title,
        content,
      });
      setLastSaved(currentData);
    }, 800);

    return () => clearTimeout(timeout);
  }, [title, content, selectedId]);


  const createNote = async () => {
    try {
      const res = await axios.post(`${API}/notes`, {
        title: "Untitled",
        content: "",
      });

      await fetchNotes();

      setSelectedId(res.data.id);
      setTitle("Untitled");
      setContent("");
      setLastSaved("Untitled");
    } catch (err) {
      console.error("Create error:", err);
    }
  };


  const deleteNote = async (e, id) => {
    e.stopPropagation();

    try {
      await axios.delete(`${API}/notes/${id}`);

      if (id === selectedId) {
        setSelectedId(null);
        setTitle("");
        setContent("");
      }

      fetchNotes();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };


  const selectNote = (note) => {
    setSelectedId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setLastSaved(note.title + note.content);
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <div className="sidebar">
        <button className="new-btn" onClick={createNote}>
          + New Note
        </button>

        {notes.length === 0 && <p>No notes yet</p>}

        {notes.map((note) => (
          <div
            key={note.id}
            className={`note-item ${
              selectedId === note.id ? "active" : ""
            }`}
          >
            <div onClick={() => selectNote(note)}>
              <h4>{note.title || "Untitled"}</h4>
            </div>

            <button
              className="delete-btn"
              onClick={(e) => deleteNote(e, note.id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Editor */}
      <div className="editor">
        {!selectedId && <p>Select or create a note</p>}

        <input
          className="title-input"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="textarea"
          placeholder="Write markdown here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {/* Preview */}
      <div className="preview">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default App;