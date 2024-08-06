import React from 'react';
import Modal from 'react-modal';
import { customStyles } from '../../common/modals/customStyles';

Modal.setAppElement('#root');

const ConfirmationModal = ({ open, setIsOpen, action, itemName, deleteCallback }) => {
  return (
    <Modal
      isOpen={open}
      onRequestClose={() => setIsOpen(false)}
      style={customStyles}
    >
      <h2>{action.charAt(0).toUpperCase() + action.slice(1)} {itemName}</h2>
      <p>Are u sure want to {action} {itemName}?</p>

      <button onClick={() => deleteCallback()}>Yes</button>
      <button onClick={() => setIsOpen(false)}>No</button>
    </Modal>
  );
}

export default ConfirmationModal;
