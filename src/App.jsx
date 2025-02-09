import {useState, useEffect, useCallback} from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from "./components/header/header.jsx";

const folders = [
    { id: 1, name: 'Notes', count: 3 },
    { id: 2, name: 'Dev Notes', count: 5 },
    { id: 3, name: 'Personal', count: 2 },
]

function App() {
    const [notes, setNotes] = useState([]);
    const [activeNote, setActiveNote] = useState(null);
    const [noteContent, setNoteContent] = useState('');
    const [darkMode, setDarkMode] = useState(false);

    // Load notes from localStorage on startup
    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        setNotes(savedNotes);
    }, []);

    // Save notes to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    // Toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const addNote = useCallback(() => {
        const newNote = {
            id: Date.now(),
            title: 'New Note',
            content: '',
        };
        setNotes([...notes, newNote]);
        setActiveNote(newNote.id);
        setNoteContent('');
    }, [notes])

    const deleteNote = (id) => {
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
        if (activeNote === id) {
            setActiveNote(null);
            setNoteContent('');
        }
    };

    const updateNote = (id, content) => {
        const updatedNotes = notes.map((note) =>
            note.id === id ? { ...note, content } : note
        );
        setNotes(updatedNotes);
    };

    const handleNoteClick = (id) => {
        const note = notes.find((note) => note.id === id);
        setActiveNote(id);
        setNoteContent(note.content);
    };

    return (
        <div className={`container-fluid ${darkMode ? 'dark-mode' : ''}`}>
            <div className="row">
                {/* Folders Sidebar */}
                <div className={`col-md-2 sidebar ${darkMode ? 'dark-mode' : ''}`}>
                    <ul className="list-group mt-3">
                        {folders.map((folder) => (
                            <li
                                key={folder.id}
                                className={`list-group-item ${darkMode ? 'dark-mode' : ''}`}
                            >
                                {folder.name} ({folder.count})
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Notes Sidebar */}
                <div className={`col-md-2 sidebar ${darkMode ? 'dark-mode' : ''}`}>
                    <button className="btn btn-secondary w-100 mt-3" onClick={toggleDarkMode}>
                        {darkMode ? <FaSun/> : <FaMoon/>} {darkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                    <ul className="list-group mt-3">
                        {notes.map((note) => (
                            <li
                                key={note.id}
                                className={`list-group-item ${
                                    activeNote === note.id ? 'active' : ''
                                } ${darkMode ? 'dark-mode' : ''}`}
                                onClick={() => handleNoteClick(note.id)}
                            >
                                {note.title}
                                <button
                                    className="btn btn-danger btn-sm float-end"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteNote(note.id);
                                    }}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main Content */}
                <div className="col-md-8 px-0">
                    <Header addNewNote={addNote}/>
                    {activeNote ? (
                        <textarea
                            className={`form-control mt-3 ${darkMode ? 'dark-mode' : ''}`}
                            rows="20"
                            value={noteContent}
                            onChange={(e) => {
                                setNoteContent(e.target.value);
                                updateNote(activeNote, e.target.value);
                            }}
                        />
                    ) : (
                        <div className={`text-center mt-5 ${darkMode ? 'dark-mode' : ''}`}>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;