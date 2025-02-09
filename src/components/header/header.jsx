import PropTypes from 'prop-types';
import { FaEdit, FaRegShareSquare } from 'react-icons/fa';
import './header.css';

const Header = ({ addNewNote }) => {
  return (
    <header className="header">
      <div className="header-left">
        <button className="header-button" onClick={addNewNote}><FaEdit/></button>
      </div>
      <div className="header-center">

      </div>
        <div className="header-right">
            <button className="header-button">
                <FaRegShareSquare/>
            </button>
            <input type="text" className="header-search" placeholder="Search"/>
            {/*<button className="header-button">*/}
            {/*    <FaRegShareSquare/>*/}
            {/*</button>*/}
        </div>
    </header>
  );
};

Header.propTypes = {
    addNewNote: PropTypes.func.isRequired,
};


export default Header;