import React, { useState } from 'react';
import styles from './Protocol.module.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  deleteProtocolByID,
  getAllProtocols,
} from '../../redux/slices/protocolSlice';
import { useDispatch } from 'react-redux';
import DeleteConfirmation from '../Modals/DeleteConfirmation';

const Protocol = ({ protocol }) => {
  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] = useState();
  const dispatch = useDispatch();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  const deleteHandler = async () => {
    await dispatch(
      deleteProtocolByID({
        parkOfficerID: protocol.officerId,
        protocolID: protocol.id,
      })
    );
    await dispatch(getAllProtocols());
  };

  return (
    <article className={styles['card-wrapper']}>
      <h1>Protocol № {protocol.id}</h1>

      <p>Service notes: {protocol.serviceNotes}</p>
      <p>Fine amount: {protocol.fineAmount}</p>
      <p>Violator full name: {protocol.violatorFullName}</p>
      <p>Violator passport number: {protocol.violatorPassportNumber}</p>
      <p>Created: {protocol.createdAt}</p>
      <p>Updated: {protocol.updatedAt}</p>

      <p>Officer full name: {protocol.parkOfficer.full_name}</p>
      <p>Officer badge number: {protocol.parkOfficer.badge_number}</p>

      <button onClick={() => setDeleteConfirmationModalOpen(true)}>
        Delete
      </button>
      {deleteConfirmationModalOpen && (
        <DeleteConfirmation
          open={deleteConfirmationModalOpen}
          setIsOpen={setDeleteConfirmationModalOpen}
          itemName={`protocol № ${protocol.id}`}
          deleteCallback={deleteHandler}
        />
      )}

      {protocol.images.length > 0 && (
        <Slider {...settings} className={styles.slider}>
          {protocol.images.map((currentImage) => (
            <img
              className={styles.img}
              key={currentImage.id}
              src={`http://localhost:5001/images/${currentImage.path}`}
              alt={protocol.id}
            />
          ))}
        </Slider>
      )}
    </article>
  );
};

export default Protocol;
