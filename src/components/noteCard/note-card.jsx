import PropTypes from 'prop-types';
import './index.css'

const NoteCard = ({note, darkMode}) => {
  return (
    <div className={`card note-card ${darkMode ? 'dark-mode' : ''}`}>
      <p>{note.title}</p>
    </div>
  )
}

NoteCard.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  handleNoteClick: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired
};

export default NoteCard