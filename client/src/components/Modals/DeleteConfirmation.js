import React from 'react';
import Modal from 'react-modal';
import { customStyles } from '../../common/modals/customStyles';

Modal.setAppElement('#root');

const DeleteConfirmation = ({ open, setIsOpen, itemName, deleteCallback }) => {
  return (
    <Modal
      isOpen={open}
      onRequestClose={() => setIsOpen(false)}
      style={customStyles}
    >
      <h2>Delete {itemName}</h2>
      <p>Are u sure want to delete {itemName}?</p>

      <button onClick={() => deleteCallback()}>Yes</button>
      <button onClick={() => setIsOpen(false)}>No</button>
    </Modal>
  );
}

export default DeleteConfirmation;
