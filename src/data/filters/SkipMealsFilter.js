const SkipMealsFilter = (data, total) => {
  const filtered = [];

  for (var i in data) {
    if (parseInt(data[i]["Q37_1"], 10) === 1) {
      filtered.push(data[i]);
    }
  }

  return filtered;
};

export default SkipMealsFilter;
