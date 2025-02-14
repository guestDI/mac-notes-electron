import PropTypes from 'prop-types';
import { FaRegFolderOpen } from 'react-icons/fa';
import './folder.css';

const Folder = ({ folder, darkMode, isActive, handleFolderClick }) => {
  const handleClick = () => {
    handleFolderClick(folder.id);
  };

  return (
    <li
      key={folder.id}
      className={`list-folder-item ${
        isActive ? 'active' : ''
      } ${darkMode ? 'dark-mode' : ''}`}
      onClick={handleClick}
    >
      <FaRegFolderOpen /> {folder.name} ({folder.count})
    </li>
  );
};

Folder.propTypes = {
  folder: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    count: PropTypes.number,
  }).isRequired,
  darkMode: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  handleFolderClick: PropTypes.func.isRequired,
};

export default Folder;
