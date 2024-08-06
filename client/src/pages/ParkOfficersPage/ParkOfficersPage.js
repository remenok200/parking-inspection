import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getParkOfficers } from '../../redux/slices/parkOfficerSlice';
import ParkOfficer from '../../components/ParkOfficer/ParkOfficer';
import AddParkOfficer from '../../components/Modals/AddParkOfficer';
import styles from './ParkOfficersPage.module.scss';

const ParkOfficersPage = () => {
  const [addParkOfficerModalOpen, setAddParkOfficerModalOpen] = useState(false);
  const [filter, setFilter] = useState('worked');

  const { parkOfficers, isLoading, error } = useSelector(
    (state) => state.parkOfficers
  );
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    dispatch(getParkOfficers());
  }, []);

  if (isLoading) {
    return <div>LOADING</div>;
  }

  if (error) {
    return <div>ERROR HAPPENNED</div>;
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
    <section>
      <div className={styles['flex-wrapper']}>
        <input
          type="text"
          value={searchValue}
          onChange={({ target: { value } }) => setSearchValue(value)}
          placeholder="Search...."
        />

        <button onClick={() => setAddParkOfficerModalOpen(true)}>
          Add officer
        </button>

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

      {parkOfficersCards}

      {addParkOfficerModalOpen && (
        <AddParkOfficer
          open={addParkOfficerModalOpen}
          setIsOpen={setAddParkOfficerModalOpen}
        />
      )}

      {!parkOfficers.length ? <h1>Oops... No data =)</h1> : null}
    </section>
  );
};

export default ParkOfficersPage;
