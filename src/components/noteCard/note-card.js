import PropTypes from 'prop-types';

const NoteCard = ({}) => {

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