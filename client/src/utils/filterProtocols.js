const filterProtocols = (protocols, query) => {
  const lowerCaseQuery = query.toLowerCase().trim();
  
  const operator = ['<', '>', '='].find((op) => lowerCaseQuery.startsWith(op));
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
    
    return (
      protocol.violatorFullName.toLowerCase().includes(lowerCaseQuery) ||
      protocol.violatorPassportNumber.toLowerCase().includes(lowerCaseQuery) ||
      protocol.parkOfficer.full_name.toLowerCase().includes(lowerCaseQuery) ||
      protocol.parkOfficer.badge_number.toLowerCase().includes(lowerCaseQuery)
    );
  });
};

export default filterProtocols;
