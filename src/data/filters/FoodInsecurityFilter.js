const FoodInsecurityFilter = data => {
  const filtered = [];
  for (var i in data) {
    if (parseInt(data[i]["Food_Insecure"], 10) === 1) {
      filtered.push(data[i]);
    }
  }

  return filtered;
};

export default FoodInsecurityFilter;
