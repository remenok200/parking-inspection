const filterProtocols = (protocols, query, searchType) => {
  const lowerCaseQuery = query.toLowerCase().trim();
  
  if (!lowerCaseQuery) {
    return protocols;
  }

  const operator = ['<', '>', '='].find((op) => lowerCaseQuery.startsWith(op));
  const amount = parseFloat(lowerCaseQuery.slice(1).trim());

  return protocols.filter((protocol) => {
    if (searchType === 'byID') {
      return protocol.id.toString().includes(lowerCaseQuery);
    }

    const fineAmount = protocol.fineAmount;
    
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

    return (
      protocol.violatorFullName.toLowerCase().includes(lowerCaseQuery) ||
      protocol.violatorPassportNumber.toLowerCase().includes(lowerCaseQuery) ||
      protocol.parkOfficer.full_name.toLowerCase().includes(lowerCaseQuery) ||
      protocol.parkOfficer.badge_number.toLowerCase().includes(lowerCaseQuery)
    );
  });
};

export default filterProtocols;
