import React, { createContext, useContext, useState, useEffect } from 'react';

const NotesContext = createContext([]);

const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);

  // Load notes from localStorage on startup
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Add a new note
  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'New Note',
      content: '',
      drawing: null,
    };
    setNotes([...notes, newNote]);
    setActiveNote(newNote.id);
  };

  // Delete a note
  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
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

  return (
    <NotesContext
      value={{
        notes,
        activeNote,
        addNote,
        deleteNote,
        updateNote,
        setActiveNoteById,
        getActiveNoteContent,
        getActiveNoteDrawing,
      }}
    >
      {children}
    </NotesContext>
  );
};

// export const useNotes = () => useContext(NotesContext);
export { NotesContext, NotesProvider };