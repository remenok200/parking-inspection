import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getParkOfficers } from '../../redux/slices/parkOfficerSlice';
import ParkOfficer from '../../components/ParkOfficer/ParkOfficer';
import styles from './ParkOfficersPage.module.scss';
import NavBar from '../../components/NavBar/NavBar';
import { Link } from 'react-router-dom';
import useHasRole from '../../hooks/useHasRole';

const ParkOfficersPage = () => {
  const isAdmin = useHasRole('admin');

  const [filter, setFilter] = useState('worked');

  const { parkOfficers, isLoading, error } = useSelector(
    (state) => state.parkOfficers
  );
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    dispatch(getParkOfficers());
  }, [dispatch]);

  if (error) {
    return <div>ERROR HAPPENED</div>;
  }

  const filteredParkOfficers = parkOfficers.filter(
    ({ fullName, badgeNumber, district, isWorked }) => {
      const matchesSearch =
        fullName.toLowerCase().includes(searchValue.toLowerCase()) ||
        badgeNumber.toLowerCase().includes(searchValue.toLowerCase()) ||
        district.toLowerCase().includes(searchValue.toLowerCase());

      if (filter === 'all') return matchesSearch;
      if (filter === 'worked') return matchesSearch && isWorked;
      if (filter === 'notWorked') return matchesSearch && !isWorked;
      return matchesSearch;
    }
  );

  const parkOfficersCards = filteredParkOfficers.map((currentParkOfficer) => (
    <ParkOfficer key={currentParkOfficer.id} parkOfficer={currentParkOfficer} />
  ));

  return (
    <>
      <NavBar />

      <section>
        <div className={styles['flex-wrapper']}>
          <div className={styles['search-container']}>
            <input
              type="text"
              value={searchValue}
              onChange={({ target: { value } }) => setSearchValue(value)}
              placeholder="Search...."
            />
            <div className={styles['tooltip']}>
              {`Search by full name, badge number, or district`}
            </div>
          </div>

          {isAdmin && (
            <Link to="/officers/add">
              <button>Add Officer</button>
            </Link>
          )}

          <select
            value={filter}
            onChange={({ target: { value } }) => setFilter(value)}
            className={styles['filter-select']}
          >
            <option value="all">All Officers</option>
            <option value="worked">Working Officers</option>
            <option value="notWorked">Not Working Officers</option>
          </select>
        </div>

        <div className={styles['officers-cards']}>{parkOfficersCards}</div>

        {!parkOfficers.length && <h1>Oops... No data =)</h1>}
      </section>
    </>
  );
};

export default ParkOfficersPage;
