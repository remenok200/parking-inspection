import React, { useState } from 'react';
import Modal from 'react-modal';
import { customStyles } from '../../common/modals/customStyles';
import UploadImage from '../UploadImage/UploadImage';
import { addImagesToProtocol } from '../../redux/slices/protocolSlice';
import { useDispatch } from 'react-redux';

Modal.setAppElement('#root');

const AddImage = ({ open, setIsOpen, protocolID, refreshProtocolsList }) => {
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);

  const uploadImageHandler = async () => {
    // request on server
    if (file) {
      const formData = new FormData();
      [...file].forEach((currentImage) => {
        formData.append('images', currentImage);
      });

      try {
        await dispatch(
          addImagesToProtocol({ protocolID, images: formData })
        );
        await refreshProtocolsList();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={() => setIsOpen(false)}
      style={customStyles}
    >
      <h2>Add images</h2>

      <UploadImage setFile={setFile} />

      {file ? <button onClick={uploadImageHandler}>Upload</button> : null}
      <button onClick={() => setIsOpen(false)}>Cancel</button>
    </Modal>
  );
};

export default AddImage;
