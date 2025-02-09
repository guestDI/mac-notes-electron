import PropTypes from 'prop-types';
import { FaEdit, FaRegShareSquare, FaRegMoon, FaSun } from 'react-icons/fa';
import './header.css';

const Header = ({ addNewNote, toggleDarkMode, darkMode }) => {
  return (
    <header className="header">
      <div className="header-left">
        <button className="header-button" onClick={addNewNote}>
          <FaEdit />
        </button>
      </div>
      <div className="header-center"></div>
      <div className="header-right">
        <button className="header-button">
          <FaRegShareSquare />
        </button>
        <input type="text" className="header-search" placeholder="Search" />
        <button
          className="header-button"
          onClick={toggleDarkMode}
        >
          {darkMode ? <FaSun /> : <FaRegMoon />}{' '}
        </button>
      </div>
    </header>
  );
};

Header.propTypes = {
  addNewNote: PropTypes.func.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired
};

export default Header;
