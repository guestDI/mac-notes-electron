import ReactDOM from 'react-dom';

const Toast = ({ message, onClose }) => {
  return ReactDOM.createPortal(
    <div className='toast'>
      {message}
      <button className='toast-btn' onClick={onClose}>
        Close
      </button>
    </div>,
    document.getElementById('toast-root')
  );
};

export default Toast;