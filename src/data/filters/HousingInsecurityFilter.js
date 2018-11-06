const HousingInsecurityFilter = data => {
  const filtered = [];
  for (var i in data) {
    if (data[i]["Housing_Insecure"] !== "N") {
      filtered.push(data[i]);
    }
  }
  return filtered;
};

export default HousingInsecurityFilter;
