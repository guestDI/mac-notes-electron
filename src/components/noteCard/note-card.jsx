import PropTypes from 'prop-types';
import './index.css';

const NoteCard = ({ note, darkMode, isActive, handleNoteClick }) => {
  const handleClick = () => {
    handleNoteClick(note.id);
  };

  return (
    <div
      className={`card note-card ${darkMode ? 'dark-mode' : ''} ${
        isActive ? 'active' : ''
      }`}
      onClick={handleClick}
    >
      {note.content ? (
        <p className="note-card--content">{note.content}</p>
      ) : (
        <p className="note-card--title">{note.title}</p>
      )}
    </div>
  );
};

NoteCard.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
  }).isRequired,
  handleNoteClick: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default NoteCard;
