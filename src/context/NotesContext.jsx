import { createContext, useState, useEffect } from 'react';
import { v4 } from 'uuid';

const mockedFolders = [
  { id: 1, name: 'Notes', count: 0 },
  { id: 2, name: 'Dev Notes', count: 0 },
  { id: 3, name: 'Personal', count: 0 },
];

const NotesContext = createContext(null);

// eslint-disable-next-line react/prop-types
const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [activeFolder, setActiveFolder] = useState(1);
  const [folders, setFolders] = useState(mockedFolders);

  // Load notes from localStorage on startup
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const updateFolderCount = (delta = 1, folderId = activeFolder) => {
    setFolders((prev) =>
      prev.map((f) =>
        f.id === folderId ? { ...f, count: Math.max(0, (f.count || 0) + delta) } : f
      )
    );
  };
  
  // Add a new note
  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'New Note',
      content: '',
      drawing: null,
      folder: activeFolder
    };
    setNotes([...notes, newNote]);
    setActiveNote(newNote.id);
    updateFolderCount(1, activeFolder);
  };
  
  // Delete a note
  const deleteNote = (id) => {
    const noteToDelete = notes.find((note) => note.id === id);
    if (!noteToDelete) return;
    const folderId = noteToDelete.folder;
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    updateFolderCount(-1, folderId);
    if (activeNote === id) {
      setActiveNote(null);
    }
  };

  // Update a note
  const updateNote = (id, content, drawing) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, content, drawing } : note
    );
    setNotes(updatedNotes);
  };

  // Set the active note
  const setActiveNoteById = (id) => {
    const note = notes.find((note) => note.id === id);
    setActiveNote(note ? id : null);
  };

  // Get the active note's content
  const getActiveNoteContent = () => {
    const note = notes.find((note) => note.id === activeNote);
    return note ? note.content : '';
  };

  // Get the active note's drawing
  const getActiveNoteDrawing = () => {
    const note = notes.find((note) => note.id === activeNote);
    return note ? note.drawing : null;
  };

  const addFolder = (folderName) => {
    const newFolder = {
      id: v4(),
      name: folderName,
      count: 0,
    };
    setFolders((prevState) => [...prevState, newFolder]);
    setActiveFolder(newFolder.id);
  };

  const setActiveFolderById = (id) => {
    const folder = folders.find((folder) => folder.id === id);
    setActiveFolder(folder ? id : null);
  };

  return (
    <NotesContext
      value={{
        folders,
        notes,
        activeNote,
        addNote,
        deleteNote,
        updateNote,
        setActiveNoteById,
        getActiveNoteContent,
        getActiveNoteDrawing,
        addFolder,
        setActiveFolderById,
        activeFolder,
      }}
    >
      {children}
    </NotesContext>
  );
};

// export const useNotes = () => useContext(NotesContext);
export { NotesContext, NotesProvider };
