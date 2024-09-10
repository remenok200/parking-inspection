import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllProtocols,
  getAllProtocolsByOfficerID,
} from '../../redux/slices/protocolSlice';
import { useParams } from 'react-router-dom';
import styles from './ProtocolsPage.module.scss';
import Pagination from '../../components/Pagination/Pagination';
import NavBar from '../../components/NavBar/NavBar';
import CONSTANTS from '../../constants';
import filterProtocols from '../../utils/filterProtocols';
import { Link } from 'react-router-dom';
import { getParkOfficerByID } from '../../API';
const { LIMIT } = CONSTANTS;

const ProtocolsPage = () => {
  const { parkOfficerID } = useParams();

  const { protocols, error, totalProtocolsCount } = useSelector(
    (state) => state.protocols
  );

  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showPagination, setShowPagination] = useState(true);

  const [parkOfficerFullName, setParkOfficerFullName] = useState(null);

  useEffect(() => {
    if (parkOfficerID) {
      getParkOfficerByID(parkOfficerID)
        .then(({ data: { data } }) => {
          setParkOfficerFullName(data[0].fullName);
        })
        .catch((err) => {
          console.error('Failed to fetch park officer data:', err);
        });
    }
  }, [parkOfficerID]);

  const [showSelect, setShowSelect] = useState(false);
  const [searchType, setSearchType] = useState('default');

  const refreshProtocolsList = () => {
    if (showPagination) {
      if (parkOfficerID) {
        dispatch(
          getAllProtocolsByOfficerID({ parkOfficerID, page: pageNumber })
        );
      } else {
        dispatch(getAllProtocols(pageNumber));
      }
    } else {
      if (parkOfficerID) {
        dispatch(getAllProtocolsByOfficerID({ parkOfficerID }));
      } else {
        dispatch(getAllProtocols());
      }
    }
  };

  useEffect(() => {
    setTotalPages(Math.ceil(totalProtocolsCount / LIMIT));

    refreshProtocolsList();
  }, [
    pageNumber,
    totalProtocolsCount,
    dispatch,
    parkOfficerID,
    showPagination,
  ]);

  if (error) {
    return <div>ERROR HAPPENED</div>;
  }

  const filteredProtocols = filterProtocols(protocols, searchValue, searchType);

  return (
    <>
      <NavBar />

      <section>
        <div className={styles['flex-center']}>
          <div className={styles['search-container']}>
            <input
              type="text"
              value={searchValue}
              onChange={({ target: { value } }) => setSearchValue(value)}
              onFocus={() => setShowSelect(true)}
              placeholder="Search..."
            />
            {showSelect && (
              <select
                value={searchType}
                onChange={({ target: { value } }) => setSearchType(value)}
                className={styles['filter-select']}
              >
                <option value="default">Default Search</option>
                <option value="byID">Search by Protocol ID</option>
              </select>
            )}
            <div className={styles['tooltip']}>
              {searchType === 'byID'
                ? 'Search by Protocol ID (e.g., 12345)'
                : 'Search by fine (e.g., >50, <100, =75) or other criteria: violator full name; violator passport number; park officer full name; park officer badge number'}
            </div>
          </div>
        </div>

        {parkOfficerFullName ? (
          <h1 className={styles.header}>{parkOfficerFullName} | Protocols</h1>
        ) : (
          <h1 className={styles.header}>All protocols</h1>
        )}

        <div className={styles['protocols-list']}>
          {filteredProtocols.map((protocol) => (
            <div key={protocol.id} className={styles['protocol-card']}>
              <h3>Protocol № {protocol.id}</h3>
              <p>Violator: {protocol.violatorFullName}</p>
              <p>Violator passport number: {protocol.violatorPassportNumber}</p>
              <p>Fine: {protocol.fineAmount}</p>
              <Link
                to={`/protocols/details/${protocol.id}`}
                className={styles['view-details-link']}
              >
                View Details
              </Link>
            </div>
          ))}
        </div>

        {!protocols.length ? <h1>Oops... No data =)</h1> : null}

        {showPagination && totalPages > 1 ? (
          <Pagination
            currentPage={pageNumber}
            totalPages={totalPages}
            onPageChange={setPageNumber}
          />
        ) : null}

        {totalPages > 1 ? (
          <div className={styles['pagination-toggle-wrapper']}>
            <button onClick={() => setShowPagination(!showPagination)}>
              {showPagination
                ? 'Show All Protocols (without pages)'
                : 'Return pages'}
            </button>
          </div>
        ) : null}
      </section>
    </>
  );
};

export default ProtocolsPage;
