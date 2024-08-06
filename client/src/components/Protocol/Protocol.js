import React, { useState } from 'react';
import styles from './Protocol.module.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  deleteProtocolByID,
  deleteProtocolImageByID,
} from '../../redux/slices/protocolSlice';
import { useDispatch } from 'react-redux';
import ConfirmationModal from '../Modals/ConfirmationModal';
import UpdateProtocol from '../Modals/UpdateProtocol';
import { CustomPrevArrow, CustomNextArrow } from '../CustomArrows/CustomArrows';
import { formatDateTime, timeAgo } from '../../utils/dateUtil';
import AddImage from '../Modals/AddImage';

const Protocol = ({ protocol, refreshProtocolsList }) => {
  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState(false);
  const [deleteImageConfirmationModal, setDeleteImageConfirmationModal] =
    useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addImagesModalOpen, setAddImagesModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const dispatch = useDispatch();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: protocol.images.length > 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    afterChange: (currentImageIndex) => {
      setCurrentSlide(currentImageIndex);
    },
  };

  const deleteHandler = async () => {
    await dispatch(
      deleteProtocolByID({
        parkOfficerID: protocol.officerId,
        protocolID: protocol.id,
      })
    );
    refreshProtocolsList();
  };

  const deleteImageHandler = async () => {
    await dispatch(
      deleteProtocolImageByID({
        protocolID: protocol.id,
        imageID: protocol.images[currentSlide].id,
      })
    );

    refreshProtocolsList();
  };

  return (
    <article className={styles['card-wrapper']}>
      <h1>Protocol № {protocol.id}</h1>

      <p>Service notes: {protocol.serviceNotes}</p>
      <p>Fine amount: {protocol.fineAmount}</p>
      <p>Violator full name: {protocol.violatorFullName}</p>
      <p>Violator passport number: {protocol.violatorPassportNumber}</p>
      <p>
        Created: {formatDateTime(protocol.createdAt)} |{' '}
        {timeAgo(protocol.createdAt)}
      </p>
      <p>
        Updated: {formatDateTime(protocol.updatedAt)} |{' '}
        {timeAgo(protocol.updatedAt)}
      </p>

      <p>Officer full name: {protocol.parkOfficer.full_name}</p>
      <p>Officer badge number: {protocol.parkOfficer.badge_number}</p>

      <div className={styles['button-container']}>
        <button onClick={() => setDeleteConfirmationModalOpen(true)}>
          Delete
        </button>
        {deleteConfirmationModalOpen && (
          <ConfirmationModal
            open={deleteConfirmationModalOpen}
            setIsOpen={setDeleteConfirmationModalOpen}
            action={'delete'}
            itemName={`protocol № ${protocol.id}`}
            deleteCallback={deleteHandler}
          />
        )}

        <button onClick={() => setEditModalOpen(true)}>Edit</button>
        {editModalOpen && (
          <UpdateProtocol
            open={editModalOpen}
            setIsOpen={setEditModalOpen}
            protocol={protocol}
            refreshProtocolsList={refreshProtocolsList}
          />
        )}

        <button onClick={() => setAddImagesModalOpen(true)}>
          Add image(s)
        </button>
        {addImagesModalOpen && (
          <AddImage
            open={addImagesModalOpen}
            setIsOpen={setAddImagesModalOpen}
            protocolID={protocol.id}
            refreshProtocolsList={refreshProtocolsList}
          />
        )}
      </div>

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

      <div className={styles['button-container']}>
        {protocol.images.length > 0 && (
          <>
            <button onClick={() => setDeleteImageConfirmationModal(true)}>
              Delete current image in the slider
            </button>
            {deleteImageConfirmationModal && (
              <ConfirmationModal
                open={deleteImageConfirmationModal}
                setIsOpen={setDeleteImageConfirmationModal}
                action={'delete'}
                itemName={`this image`}
                deleteCallback={deleteImageHandler}
              />
            )}
          </>
        )}
      </div>
    </article>
  );
};

export default Protocol;
