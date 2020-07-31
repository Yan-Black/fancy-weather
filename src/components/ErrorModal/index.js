import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { appContext } from '../App';
import './index.css';

const Modal = () => {
  const { err: [err, setErr] } = useContext(appContext);
  const modalClickHandler = () => setErr({ err: '', open: false });
  const modalKeyHandler = (e) => e.key === 'Escape' && setErr({ err: '', open: false });
  return (
    <div
      className="modal-wrapper"
      onClick={modalClickHandler}
    >
      <div className="modal-container">
        <div className="modal-header">
          <button
            className="close-modal"
            id="close-modal"
            onClick={modalClickHandler}
            onKeyPress={modalKeyHandler}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="modal-message">
          <span className="modal-error">
            {err.message}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Modal;
