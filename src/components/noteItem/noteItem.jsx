import { FaTrashAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';

const NoteItem = ({ note, handleNoteClick, deleteNote, isActive, darkMode}) => {
  const handleClick = () => {
    handleNoteClick(note.id)
  }

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteNote(note.id)
  }

  return (
    <li
      className={`list-group-item ${
        isActive ? 'active' : ''
      } ${darkMode ? 'dark-mode' : ''}`}
      onClick={handleClick}
    >
      {note.title}
      <button
        className="btn btn-sm float-end"
        onClick={handleDelete}
      >
        <FaTrashAlt />
      </button>
    </li>
  )
}

NoteItem.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  handleNoteClick: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired
};

export default NoteItem