import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ProtocolDetailsPage.module.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteProtocolByID,
  deleteProtocolImageByID,
  getProtocolById,
} from '../../redux/slices/protocolSlice';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import {
  CustomPrevArrow,
  CustomNextArrow,
} from '../../components/CustomArrows/CustomArrows';
import { formatDateTime, timeAgo } from '../../utils/dateUtil';
import useHasRole from '../../hooks/useHasRole';
import generateProtocolPDF from '../../utils/pdfUtilProtocols';
import CONSTANTS from '../../constants';
import {
  Delete,
  Edit,
  PictureAsPdf,
  AddPhotoAlternate,
} from '@mui/icons-material';

const { GET_IMAGES_BASE_URL } = CONSTANTS;

const ProtocolDetailsPage = () => {
  const isAdmin = useHasRole('admin');
  const { protocolID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedProtocol: protocol } = useSelector(
    (state) => state.protocols
  );

  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState(false);
  const [deleteImageConfirmationModal, setDeleteImageConfirmationModal] =
    useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const fetchProtocol = async () => {
    try {
      await dispatch(getProtocolById(protocolID));
    } catch (error) {
      console.error('Failed to fetch protocol:', error);
    }
  };

  useEffect(() => {
    fetchProtocol();
  }, [protocolID]);

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
    beforeChange: (currentImageIndex, nextImageIndex) => {
      setTimeout(() => setCurrentSlide(nextImageIndex), 500);
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
    await fetchProtocol();
    setDeleteImageConfirmationModal(false);
  };

  const handleGeneratePDF = () => {
    generateProtocolPDF(protocol);
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

        <div className={styles['button-container']}>
          <button onClick={handleGeneratePDF}>
            <PictureAsPdf fontSize="small" /> Generate PDF
          </button>
          {isAdmin && (
            <>
              <button onClick={() => setDeleteConfirmationModalOpen(true)}>
                <Delete fontSize="small" /> Delete
              </button>
              <button
                onClick={() => navigate(`/protocols/edit/${protocol.id}`)}
              >
                <Edit fontSize="small" /> Edit
              </button>
              <button
                onClick={() => navigate(`/protocols/${protocol.id}/add/image`)}
              >
                <AddPhotoAlternate fontSize="small" /> Add Image(s)
              </button>
            </>
          )}
        </div>

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
              src={`${GET_IMAGES_BASE_URL}/${currentImage.path}`}
              alt={protocol.id}
            />
          ))}
        </Slider>
      )}

      {isAdmin && protocol.images.length > 0 && (
        <div className={styles['button-container']}>
          <button onClick={deleteImageHandler}>
            <Delete fontSize="small" /> Delete current image in the slider
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

export default ProtocolDetailsPage;
