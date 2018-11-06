const EnergyOutgoingFilter = (data, threshold = 1, gtlt = ">") => {
  const filtered = [];
  for (var i in data) {
    if (data[i].energyOutgoing >= threshold) {
      filtered.push(data[i]);
    }
  }

  return filtered;
};

export default EnergyOutgoingFilter;
