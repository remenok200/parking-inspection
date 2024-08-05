import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllProtocols,
  getAllProtocolsByOfficerID,
} from '../../redux/slices/protocolSlice';
import Protocol from '../../components/Protocol/Protocol';
import { useParams } from 'react-router-dom';

const ProtocolsPage = () => {
  const { parkOfficerID, parkOfficerFullName } = useParams();

  const { protocols, isLoading, error } = useSelector(
    (state) => state.protocols
  );
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (parkOfficerID) {
      dispatch(getAllProtocolsByOfficerID(parkOfficerID));
    } else {
      dispatch(getAllProtocols());
    }
  }, []);

  if (isLoading) {
    return <div>LOADING</div>;
  }

  if (error) {
    return <div>ERROR HAPPENNED</div>;
  }

  const filteredProtocols = protocols.filter(
    ({
      violatorFullName,
      violatorPassportNumber,
      parkOfficer: { full_name, badge_number },
    }) =>
      violatorFullName.toLowerCase().includes(searchValue.toLowerCase()) ||
      violatorPassportNumber
        .toLowerCase()
        .includes(searchValue.toLowerCase()) ||
      full_name.toLowerCase().includes(searchValue.toLowerCase()) ||
      badge_number.toLowerCase().includes(searchValue.toLowerCase())
  );

  const protocolsCards = filteredProtocols.map((currentProtocol) => (
    <Protocol key={currentProtocol.id} protocol={currentProtocol} />
  ));

  return (
    <section>
      <input
        type="text"
        value={searchValue}
        onChange={({ target: { value } }) => setSearchValue(value)}
        placeholder="Search...."
      />

      {parkOfficerFullName && <h1>{parkOfficerFullName} | Protocols</h1>}

      {protocolsCards}
    </section>
  );
};

export default ProtocolsPage;
