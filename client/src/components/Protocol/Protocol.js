import React from 'react';
import styles from './Protocol.module.scss';

const Protocol = ({ protocol }) => {
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

      {protocol.images.map((currentImage) => (
        <img
          key={currentImage.id}
          src={`http://localhost:5001/images/${currentImage.path}`}
          alt={protocol.id}
        />
      ))}
    </article>
  );
};

export default Protocol;
