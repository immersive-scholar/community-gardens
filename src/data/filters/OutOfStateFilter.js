const OutOfStateFilter = data => {
  const filtered = [];
  for (var i in data) {
    if (parseInt(data[i]["OutofState"], 10) === 1) {
      filtered.push(data[i]);
    }
  }

  return filtered;
};

export default OutOfStateFilter;
