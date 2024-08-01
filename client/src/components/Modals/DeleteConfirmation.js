import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const DeleteConfirmation = ({ open, setIsOpen, officerFullName, deleteCallback }) => {
  return (
    <Modal
      isOpen={open}
      onRequestClose={() => setIsOpen(false)}
      style={customStyles}
    >
      <h2>Delete park officer</h2>
      <p>Are u sure want to delete {officerFullName}?</p>

      <button onClick={() => deleteCallback()}>Yes</button>
      <button onClick={() => setIsOpen(false)}>No</button>
    </Modal>
  );
}

export default DeleteConfirmation;
