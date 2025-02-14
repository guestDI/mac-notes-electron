import PropTypes from 'prop-types';
import './index.css';

const NoteItem = ({ note, handleNoteClick, isActive, darkMode }) => {
  const handleClick = () => {
    handleNoteClick(note.id);
  };

  return (
    <>
      <hr className="hr" />
      <li
        className={`note-item ${
          isActive ? 'active' : ''
        } ${darkMode ? 'dark-mode' : ''}`}
        onClick={handleClick}
      >
        {note.content ? <div>{note.content}</div> : <div>{note.title}</div>}
      </li>
    </>
  );
};

NoteItem.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
  }).isRequired,
  handleNoteClick: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default NoteItem;
