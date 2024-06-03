"use client"
import { createContext, useContext, useState } from 'react';

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setAllNotes] = useState([]);

  const setNotes = (type, notes) => {

    setAllNotes(notes);

  }

  const restartNotes = () => {
    setNotes([]);
  }

  return (
    <NotesContext.Provider value={{ notes, setAllNotes }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
