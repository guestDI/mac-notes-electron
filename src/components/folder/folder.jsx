import PropTypes from 'prop-types';
import { FaRegFolderOpen } from 'react-icons/fa';
import './folder.css';

const Folder = ({folder, darkMode}) => {
  return (
    <li
      key={folder.id}
      className={`list-folder-item ${darkMode ? 'dark-mode' : ''}`}
    >
      <FaRegFolderOpen /> {folder.name} ({folder.count})
    </li>
  )
}

Folder.propTypes = {
  folder: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    count: PropTypes.number,
  }).isRequired,
  darkMode: PropTypes.bool.isRequired
};

export default Folder