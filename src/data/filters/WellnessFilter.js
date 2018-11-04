const WellnessFilter = (data, threshold = 4) => {
  const filtered = [];
  for (var i in data) {
    if (data[i].emotionalHealth >= threshold) {
      filtered.push(data[i]);
    }
  }

  return filtered;
};

export default WellnessFilter;
