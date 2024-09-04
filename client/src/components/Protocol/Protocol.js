import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Protocol.module.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch } from 'react-redux';
import {
  deleteProtocolByID,
  deleteProtocolImageByID,
} from '../../redux/slices/protocolSlice';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import { CustomPrevArrow, CustomNextArrow } from '../CustomArrows/CustomArrows';
import { formatDateTime, timeAgo } from '../../utils/dateUtil';
import { getProtocolById } from '../../API';
import Spinner from '../Spinner/Spinner';
import useHasRole from '../../hooks/useHasRole';

const Protocol = () => {
  const isAdmin = useHasRole('admin');

  const { protocolID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [protocol, setProtocol] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState(false);
  const [deleteImageConfirmationModal, setDeleteImageConfirmationModal] =
    useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchProtocol = async () => {
      try {
        const {
          data: { data },
        } = await getProtocolById(protocolID);
        setProtocol(data);
      } catch (error) {
        console.error('Failed to fetch protocol:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProtocol();
  }, [protocolID]);

  if (loading) {
    return (
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.8)',
            zIndex: 9999,
          }}
        >
          <Spinner />
        </div>
      </div>
    );
  }

  if (!protocol) {
    return <h1>Protocol not found.</h1>;
  }

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

    setDeleteConfirmationModalOpen(false);
    navigate('/protocols');
  };

  const deleteImageHandler = async () => {
    await dispatch(
      deleteProtocolImageByID({
        protocolID: protocol.id,
        imageID: protocol.images[currentSlide].id,
      })
    );
    setDeleteImageConfirmationModal(false);
  };

  return (
    <div className={styles['protocol-page']}>
      <button onClick={() => navigate(-1)} className={styles['back-button']}>
        Back
      </button>

      <article className={styles['protocol-details']}>
        <h1>Protocol № {protocol.id}</h1>

        <div className={styles['section']}>
          <h2 className={styles['section-title']}>Details</h2>
          <p>Service notes: {protocol.serviceNotes}</p>
          <p>Fine amount: {protocol.fineAmount}</p>
          <p>Violator full name: {protocol.violatorFullName}</p>
          <p>Violator passport number: {protocol.violatorPassportNumber}</p>
        </div>

        <div className={styles['section']}>
          <h2 className={styles['section-title']}>Timestamps</h2>
          <p>
            Created: {formatDateTime(protocol.createdAt)} |{' '}
            {timeAgo(protocol.createdAt)}
          </p>
          <p>
            Updated: {formatDateTime(protocol.updatedAt)} |{' '}
            {timeAgo(protocol.updatedAt)}
          </p>
        </div>

        <div className={styles['section']}>
          <h2 className={styles['section-title']}>Officer Details</h2>
          <p>Officer full name: {protocol.parkOfficer.full_name}</p>
          <p>Officer badge number: {protocol.parkOfficer.badge_number}</p>
        </div>

        {isAdmin && (
          <div className={styles['button-container']}>
            <button onClick={() => setDeleteConfirmationModalOpen(true)}>
              Delete
            </button>
            <button onClick={() => navigate(`/protocols/edit/${protocol.id}`)}>
              Edit
            </button>
            <button
              onClick={() => navigate(`/protocols/${protocol.id}/add/image`)}
            >
              Add Image(s)
            </button>
          </div>
        )}

        {deleteConfirmationModalOpen && (
          <ConfirmationModal
            open={deleteConfirmationModalOpen}
            setIsOpen={setDeleteConfirmationModalOpen}
            action={'delete'}
            itemName={`protocol № ${protocol.id}`}
            deleteCallback={deleteHandler}
          />
        )}
      </article>

      {protocol.images.length > 0 && (
        <Slider {...settings} className={styles['slider']}>
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

      {protocol.images.length > 0 && (
        <div className={styles['button-container']}>
          <button onClick={deleteImageHandler}>
            Delete current image in the slider
          </button>
        </div>
      )}

      {deleteImageConfirmationModal && (
        <ConfirmationModal
          open={deleteImageConfirmationModal}
          setIsOpen={setDeleteImageConfirmationModal}
          action={'delete'}
          itemName={`this image`}
          deleteCallback={deleteImageHandler}
        />
      )}
    </div>
  );
};

export default Protocol;
