import React, { useState, useEffect } from 'react';
import UploadImage from '../UploadImage/UploadImage';
import { addImagesToProtocol } from '../../redux/slices/protocolSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './AddImage.module.scss';

const AddImage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { protocolID } = useParams();

  const { protocols } = useSelector((state) => state.protocols);
  const [protocol, setProtocol] = useState(null);

  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchProtocol = () => {
      const foundProtocol = protocols.find(
        (p) => p.id === parseInt(protocolID)
      );
      setProtocol(foundProtocol);
    };

    fetchProtocol();
  }, [protocolID, protocols]);

  const uploadImageHandler = async () => {
    if (file && protocol) {
      const formData = new FormData();
      [...file].forEach((currentImage) => {
        formData.append('images', currentImage);
      });

      try {
        await dispatch(addImagesToProtocol({ protocolID, images: formData }));
        navigate('/protocols');
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (!protocol) {
    return;
  }

  return (
    <div className={styles['add-image-wrapper']}>
      <div className={styles['add-image-container']}>
        <h2 className={styles['add-image-title']}>
          Protocol № {protocol.id} | Add images
        </h2>

        <UploadImage setFile={setFile} />

        {file ? (
          <button
            className={styles['upload-button']}
            onClick={uploadImageHandler}
          >
            Upload
          </button>
        ) : null}
        <button
          className={styles['upload-button']}
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddImage;
