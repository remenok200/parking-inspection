import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getParkOfficers } from '../../redux/slices/parkOfficerSlice';
import ParkOfficer from '../../components/ParkOfficer/ParkOfficer';
import AddParkOfficer from '../../components/Modals/AddParkOfficer';

const ParkOfficersPage = () => {
  const [addParkOfficerModalOpen, setAddParkOfficerModalOpen] = useState(false);

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
    ({ fullName, badgeNumber, district }) =>
      fullName.toLowerCase().includes(searchValue.toLowerCase()) ||
      badgeNumber.toLowerCase().includes(searchValue.toLowerCase()) ||
      district.toLowerCase().includes(searchValue.toLowerCase())
  );

  const parkOfficersCards = filteredParkOfficers.map((currentParkOfficer) => (
    <ParkOfficer key={currentParkOfficer.id} parkOfficer={currentParkOfficer} />
  ));

  return (
    <section>
      <input
        type="text"
        value={searchValue}
        onChange={({ target: { value } }) => setSearchValue(value)}
        placeholder="Search...."
      />

      <button onClick={() => setAddParkOfficerModalOpen(true)}>Add officer</button>

      {parkOfficersCards}

      {addParkOfficerModalOpen && (
        <AddParkOfficer
          open={addParkOfficerModalOpen}
          setIsOpen={setAddParkOfficerModalOpen}
        />
      )}
    </section>
  );
};

export default ParkOfficersPage;
