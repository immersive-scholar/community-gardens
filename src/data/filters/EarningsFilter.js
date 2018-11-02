const EarningsFilter = (data, amount = 1000, gtlt = ">") => {
  const filtered = [];
  for (var i in data) {
    // more than 30 hours
    switch (true) {
      case gtlt === "<":
        if (parseInt(data[i].Salary, 10) >= amount) {
          filtered.push(data[i]);
        }
        break;
      default:
      case gtlt === ">":
        if (parseInt(data[i].Salary, 10) >= amount) {
          filtered.push(data[i]);
        }
        break;
    }
  }
  return filtered;
};

export default EarningsFilter;
