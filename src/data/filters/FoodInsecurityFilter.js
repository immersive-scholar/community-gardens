const FoodInsecurityFilter = data => {
  const filtered = [];
  for (var i in data) {
    if (
      data[i]["Food_Security"] !== "Secure" &&
      data[i]["Food_Security"] !== "99"
    ) {
      filtered.push(data[i]);
    }
  }

  return filtered;
};

export default FoodInsecurityFilter;
