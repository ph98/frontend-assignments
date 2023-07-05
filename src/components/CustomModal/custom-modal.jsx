import { useEffect } from 'react';
import './custom-modal.scss';

function CustomModal({ children, isOpen, onClose = () => {} }) {
  const closeWithEvents = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', closeWithEvents);
    } else {
      document.removeEventListener('keydown', closeWithEvents);
    }
    return () => {
      document.removeEventListener('keydown', closeWithEvents);
    };
  }, [isOpen]);

  return (
    <div
      role="button"
      onClick={onClose}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'esc') {
          onClose();
        }
      }}
      className={`custom-modal ${isOpen ? 'open' : ''}`}
    >
      {children}
      <button className="btn btn-primary close-button" onClick={onClose} type="button">
        Close
      </button>
    </div>
  );
}

export default CustomModal;
