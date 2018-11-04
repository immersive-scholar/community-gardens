const GPAFilter = (data, threshold = 4) => {
  const filtered = [];
  for (var i in data) {
    if (parseInt(data[i]["GPA"], 10) >= threshold) {
      filtered.push(data[i]);
    }
  }

  return filtered;
};

export default GPAFilter;
