const EarningsFilter = (data, amount = 1000) => {
  const filtered = [];
  for (var i in data) {
    // more than 30 hours
    if (parseInt(data[i].Salary, 10) >= amount) {
      filtered.push(data[i]);
    }
  }
  return filtered;
};

export default EarningsFilter;
