import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css'

const Modal = ({ onClose, onConfirm, darkMode }) => {
  const [folderName, setFolderName] = useState('New Folder');
  const inputRef = useRef(null)

  const handleConfirm = () => {
    if (folderName.trim()) {
      console.log('fol', folderName)
      onConfirm(folderName);
      onClose();
    }
  };

  useEffect(() => {
    inputRef?.current?.focus()
  }, [])

  return ReactDOM.createPortal(
    <div className='overlay'>
      <div className={`modal-container ${darkMode ? 'dark-mode' : ''}`}>
        <p className='c-modal-title'>New Folder</p>
        <div className='c-input-container'>
          <label>Name:</label>
          <input
            ref={inputRef}
            type="text"
            className={`${darkMode ? 'dark-mode' : ''}`}
            placeholder="Enter folder name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
        </div>
        <div className="btn-container">
          <button onClick={onClose} className="c-btn cancel-btn">
            Cancel
          </button>
          <button onClick={handleConfirm} className='c-btn confirm-btn'>
            OK
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;