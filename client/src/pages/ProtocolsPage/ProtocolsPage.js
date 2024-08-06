import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllProtocols,
  getAllProtocolsByOfficerID,
} from '../../redux/slices/protocolSlice';
import Protocol from '../../components/Protocol/Protocol';
import { useParams } from 'react-router-dom';
import styles from './ProtocolsPage.module.scss';

const ProtocolsPage = () => {
  const { parkOfficerID, parkOfficerFullName } = useParams();

  const { protocols, isLoading, error } = useSelector(
    (state) => state.protocols
  );
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState('');

  const refreshProtocolsList = () => {
    if (parkOfficerID) {
      dispatch(getAllProtocolsByOfficerID(parkOfficerID));
    } else {
      dispatch(getAllProtocols());
    }
  }

  useEffect(() => {
    refreshProtocolsList();
  }, []);

  if (isLoading) {
    return <div>LOADING</div>;
  }

  if (error) {
    return <div>ERROR HAPPENNED</div>;
  }

  const filterProtocols = (protocols, query) => {
    const lowerCaseQuery = query.toLowerCase().trim();

    // Разделяем запрос на оператор и значение
    const operator = ['<', '>', '='].find((op) =>
      lowerCaseQuery.startsWith(op)
    );
    const amount = parseFloat(lowerCaseQuery.slice(1).trim());

    return protocols.filter((protocol) => {
      const fineAmount = protocol.fineAmount;

      // Фильтруем по fineAmount
      if (operator) {
        switch (operator) {
          case '>':
            return fineAmount > amount;
          case '<':
            return fineAmount < amount;
          case '=':
            return fineAmount === amount;
          default:
            return false;
        }
      }

      // Фильтруем по другим критериям, если оператор не указан
      return (
        protocol.violatorFullName.toLowerCase().includes(lowerCaseQuery) ||
        protocol.violatorPassportNumber
          .toLowerCase()
          .includes(lowerCaseQuery) ||
        protocol.parkOfficer.full_name.toLowerCase().includes(lowerCaseQuery) ||
        protocol.parkOfficer.badge_number.toLowerCase().includes(lowerCaseQuery)
      );
    });
  };

  const filteredProtocols = filterProtocols(protocols, searchValue);

  const protocolsCards = filteredProtocols.map((currentProtocol) => (
    <Protocol key={currentProtocol.id} protocol={currentProtocol} refreshProtocolsList={refreshProtocolsList} />
  ));

  return (
    <section>
      <div className={styles['search-container']}>
        <input
          type="text"
          value={searchValue}
          onChange={({ target: { value } }) => setSearchValue(value)}
          placeholder="Search...."
        />
        <div className={styles['tooltip']}>
          {`Search by fine (e.g., >50, <100, =75) or other criteria`}
        </div>
      </div>

      {parkOfficerFullName ? (
        <h1 className={styles.header}>{parkOfficerFullName} | Protocols</h1>
      ) : (
        <h1 className={styles.header}>All protocols</h1>
      )}

      {protocolsCards}

      {!protocols.length ? <h1>Oops... No data =)</h1> : null}
    </section>
  );
};

export default ProtocolsPage;
