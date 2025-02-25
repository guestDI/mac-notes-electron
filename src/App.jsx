import { useState, useCallback, use } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/header/header.jsx';
import Folder from './components/folder/folder.jsx';
import { FaBorderAll, FaFolder, FaListUl, FaTrashAlt } from 'react-icons/fa';
import { FaPlusCircle } from 'react-icons/fa';
import NoteItem from './components/noteItem/note-item.jsx';
import { NotesContext } from './context/NotesContext.jsx';
import Modal from './components/modal/modal.jsx';
import { AppContext } from './context/AppContext.jsx';
import NoteCard from './components/noteCard/note-card.jsx';
import Toast from './components/toast/toast.jsx';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

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

  const { view, toggleView } = use(AppContext);

  const showToast = useCallback((message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000); // Auto-dismiss after 3 seconds
  }, []);

  const toggleDarkMode = useCallback(async () => {
    if (window.electron) {
      const isDarkMode = await window.electron.toggle()
      setDarkMode(isDarkMode);
      showToast(isDarkMode ? 'Theme changed to Dark' : 'Theme changed to Light')
    }
  }, [showToast]);

  const handleNoteClick = (id) => {
    setActiveNoteById(id);
  };

  const handleFolderClick = (id) => {
    setActiveFolderById(id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteNote(activeNote);
  };

  const handleShare = useCallback(() => {
    // Use the exposed Electron API to trigger the sharing menu
    if (window.electron) {
      window.electron.showShareMenu();
    } else {
      alert('Sharing is not supported in this environment.');
    }
  }, []);

  const handleAddFolder = useCallback(
    (name) => {
      addFolder(name);
    },
    [addFolder]
  );

  const isListView = view === 'list';

  return (
    <>
      <div id="toast-root"></div>
      <div className={`container-fluid ${darkMode ? 'dark-mode' : ''}`}>
        <div className="row">
          {/* Folders Sidebar */}
          <div
            className={`col-md-2 sidebar folders-sidebar ${darkMode ? 'dark-mode' : ''}`}
          >
            <div>
              <button className="btn folder-btn">
                <FaFolder />
              </button>
              <div>
                <ul className="list-group folder-group mt-3">
                  {folders.map((folder) => (
                    <Folder
                      key={folder.id}
                      folder={folder}
                      isActive={folder.id === activeFolder}
                      darkMode={darkMode}
                      handleFolderClick={handleFolderClick}
                    />
                  ))}
                </ul>
              </div>
            </div>
            <button
              className={'btn new-folder-btn'}
              onClick={() => setIsModalOpen(true)}
            >
              <FaPlusCircle /> New folder
            </button>
          </div>

          {/* Notes Sidebar */}
          {isListView && (
            <div
              className={`col-md-2 sidebar px-0 ${darkMode ? 'dark-mode' : ''}`}
            >
              <header className={`header ${darkMode ? 'dark-mode' : ''}`}>
                <div className="flex-row">
                  <button
                    className={`btn header-button ${view === 'grid' ? 'secondary' : ''}`}
                    onClick={toggleView}
                  >
                    <FaListUl />
                  </button>
                  <button
                    className={`btn header-button ${view === 'list' ? 'secondary' : ''}`}
                    onClick={toggleView}
                  >
                    <FaBorderAll />
                  </button>
                </div>
                <button
                  className="btn btn-sm float-end delete-btn"
                  onClick={handleDelete}
                >
                  <FaTrashAlt />
                </button>
              </header>
              <ul className="list-group list-unstyled mt-3 mx-2">
                {notes.map((note) => (
                  <NoteItem
                    key={note.id}
                    isActive={note.id === activeNote}
                    note={note}
                    handleNoteClick={handleNoteClick}
                    darkMode={darkMode}
                  />
                ))}
              </ul>
            </div>
          )}

          {/* Main Content */}
          <div className={`${isListView ? 'col-md-8' : 'col-md-10'}  px-0`}>
            <div className="headers-container">
              {!isListView && (
                <header
                  style={{ width: '25%' }}
                  className={`header ${darkMode ? 'dark-mode' : ''}`}
                >
                  <div className="flex-row">
                    <button
                      className={`btn header-button ${view === 'grid' ? 'secondary' : ''}`}
                      onClick={toggleView}
                    >
                      <FaListUl />
                    </button>
                    <button
                      className={`btn header-button ${view === 'list' ? 'secondary' : ''}`}
                      onClick={toggleView}
                    >
                      <FaBorderAll />
                    </button>
                  </div>
                  <button
                    className="btn btn-sm float-end delete-btn"
                    onClick={handleDelete}
                  >
                    <FaTrashAlt />
                  </button>
                </header>
              )}
              <Header
                addNewNote={addNote}
                shareNote={handleShare}
                toggleDarkMode={toggleDarkMode}
                darkMode={darkMode}
              />
            </div>
            {isListView ? (
              <>
                {activeNote ? (
                  <textarea
                    className={`form-control mt-3 shadow-none ${darkMode ? 'dark-mode' : ''}`}
                    rows="20"
                    value={getActiveNoteContent()}
                    onChange={(e) => {
                      updateNote(activeNote, e.target.value);
                    }}
                  />
                ) : (
                  <div
                    className={`text-center mt-5 ${darkMode ? 'dark-mode' : ''}`}
                  ></div>
                )}
              </>
            ) : (
              <div className="cards-container">
                {notes.map((note) => (
                  <NoteCard
                    key={note.id}
                    isActive={note.id === activeNote}
                    note={note}
                    handleNoteClick={handleNoteClick}
                    darkMode={darkMode}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {isModalOpen && (
          <Modal
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleAddFolder}
            darkMode={darkMode}
          />
        )}
        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        )}
      </div>
    </>
  );
}

export default App;
