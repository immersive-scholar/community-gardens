const HighGPAFilter = data => {
  const filtered = [];
  for (var i in data) {
    if (parseInt(data[i]["GPA"], 10) >= 3) {
      filtered.push(data[i]);
    }
  }

  return filtered;
};

export default HighGPAFilter;
