import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProtocols } from '../../redux/slices/protocolSlice';
import Protocol from '../../components/Protocol/Protocol';

const ProtocolsPage = () => {
  const { protocols, isLoading, error } = useSelector(
    (state) => state.protocols
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProtocols());
  }, []);

  if (isLoading) {
    return <div>LOADING</div>;
  }

  if (error) {
    return <div>ERROR HAPPENNED</div>;
  }

  const protocolsCards = protocols.map((currentProtocol) => (
    <Protocol key={currentProtocol.id} protocol={currentProtocol} />
  ));

  return <section>{protocolsCards}</section>;
};

export default ProtocolsPage;
