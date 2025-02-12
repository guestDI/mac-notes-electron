import { useState, useEffect, useCallback, use, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/header/header.jsx';
import Folder from './components/folder/folder.jsx';
import { FaBorderAll, FaFolder, FaListUl } from 'react-icons/fa';
import { FaPlusCircle } from "react-icons/fa";
import NoteItem from './components/noteItem/noteItem.jsx';
import { NotesContext } from './context/NotesContext.jsx';
import Modal from './components/modal/modal.jsx';
import { AppContext } from './context/AppContext.jsx';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes1, setNotes] = useState([]);
  const [noteContent, setNoteContent] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const shareButtonRef = useRef(null);

  const {
    notes,
    folders,
    activeNote,
    addNote,
    deleteNote,
    updateNote,
    setActiveNoteById,
    getActiveNoteContent,
    addFolder,
    activeFolder,
    setActiveFolderById,
    // getActiveNoteDrawing,
  } = use(NotesContext);

  const {
    view,
    toggleView
  } = use(AppContext);

  console.log('aa',view)

  // Load notes from localStorage on startup
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    // ipcRenderer.on('share-via-airdrop', () => {
    //   const note = notes.find((note) => note.id === activeNote);
    //   if (note) {
    //     const filePath = `/path/to/save/note_${note.id}.txt`; // Save note to a file
    //     const content = `Title: ${note.title}\n\n${note.content}`;
    //     require('fs').writeFileSync(filePath, content);
    //
    //     const command = `osascript -e 'tell application "Finder" to reveal POSIX file "${filePath}"' -e 'tell application "Finder" to activate'`;
    //     exec(command, (error) => {
    //       if (error) {
    //         console.error('Error sharing via AirDrop:', error);
    //       }
    //     });
    //   }
    // });

    // ipcRenderer.on('share-via-email', () => {
    //   const note = notes.find((note) => note.id === activeNote);
    //   if (note) {
    //     const filePath = `/path/to/save/note_${note.id}.txt`; // Save note to a file
    //     const content = `Title: ${note.title}\n\n${note.content}`;
    //     require('fs').writeFileSync(filePath, content);
    //
    //     const mailtoUrl = `mailto:?subject=${encodeURIComponent(
    //       'Check out this note!'
    //     )}&body=${encodeURIComponent(content)}&attachment=${encodeURIComponent(filePath)}`;
    //     shell.openExternal(mailtoUrl).catch((err) => {
    //       console.error('Error opening email client:', err);
    //     });
    //   }
    // });

    return () => {
      // ipcRenderer.removeAllListeners('share-via-airdrop');
      // ipcRenderer.removeAllListeners('share-via-email');
    };
  }, [notes, activeNote]);

  // move it to context later
  const toggleDarkMode = useCallback(() => {
    setDarkMode(!darkMode);
  }, [darkMode]) ;

  const handleNoteClick = (id) => {
    setActiveNoteById(id);
    // setNoteContent(note.content);
  };

  const handleFolderClick = (id) => {
    setActiveFolderById(id)
  };

  const handleShare = useCallback(() => {
    // Use the exposed Electron API to trigger the sharing menu
    if (window.electron) {
      window.electron.showShareMenu();
    } else {
      alert('Sharing is not supported in this environment.');
    }
  }, []) ;

  const handleAddFolder = useCallback((name) => {
    addFolder(name)
  }, [addFolder])

  return (
    <>
      <div className={`container-fluid ${darkMode ? 'dark-mode' : ''}`}>
        <div className="row">
          {/* Folders Sidebar */}
          <div className={`col-md-2 sidebar folders-sidebar ${darkMode ? 'dark-mode' : ''}`}>
            <div>
              <button className="btn folder-btn">
                <FaFolder />
              </button>
              <div>
                <ul className="list-group folder-group mt-3">
                  {folders.map((folder) => (
                    <Folder key={folder.id} folder={folder} isActive={folder.id === activeFolder}
                            darkMode={darkMode} handleFolderClick={handleFolderClick}/>
                  ))}
                </ul>
              </div>
            </div>
            <button className={'btn new-folder-btn'} onClick={() => setIsModalOpen(true)}>
              <FaPlusCircle /> New folder
            </button>
          </div>

          {/* Notes Sidebar */}
          <div className={`col-md-2 sidebar px-0 ${darkMode ? 'dark-mode' : ''}`}>
            <header className={`header ${darkMode ? 'dark-mode' : ''}`}>
              <div className="flex-row">
                <button className={`btn header-button ${view === 'grid' ? 'secondary' : ''}`} onClick={toggleView}>
                  <FaListUl />
                </button>
                <button className={`btn header-button ${view === 'list' ? 'secondary' : ''}`} onClick={toggleView}>
                  <FaBorderAll />
                </button>
              </div>
            </header>
            <ul className="list-group list-unstyled mt-3 mx-2">
              {notes.map((note) => (
                <NoteItem key={note.id} isActive={note.id === activeNote} note={note} handleNoteClick={handleNoteClick}
                          deleteNote={deleteNote} darkMode={darkMode} />
              ))}
            </ul>
          </div>

          {/* Main Content */}
          <div className="col-md-8 px-0">
            <Header addNewNote={addNote} shareNote={handleShare} toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
            {view === 'list' ?
            <>
              {activeNote ? (
                <textarea
                  className={`form-control mt-3 shadow-none ${darkMode ? 'dark-mode' : ''}`}
                  rows="20"
                  value={getActiveNoteContent()}
                  onChange={(e) => {
                    setNoteContent(e.target.value);
                    updateNote(activeNote, e.target.value);
                  }}
                />
              ) : (
                <div
                  className={`text-center mt-5 ${darkMode ? 'dark-mode' : ''}`}
                ></div>
              )}
            </> : <div>
                Grid
              </div>
            }
          </div>
        </div>

        {isModalOpen && (
          <Modal
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleAddFolder}
            darkMode={darkMode}
          />
        )}
      </div>
    </>
  );
}

export default App;
