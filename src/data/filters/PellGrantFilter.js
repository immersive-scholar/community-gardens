const PellGrantFilter = data => {
  const filtered = [];
  for (var i in data) {
    if (parseInt(data[i]["Pell"], 10) === 1) {
      filtered.push(data[i]);
    }
  }
  return filtered;
};

export default PellGrantFilter;
