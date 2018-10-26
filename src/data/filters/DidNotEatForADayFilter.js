const DidNotEatForADayFilter = data => {
  const filtered = [];
  let eat;
  for (var i in data) {
    eat = parseInt(data[i]["Q37_6"], 10);
    if (eat === 1) {
      filtered.push(data[i]);
    }
  }
  return filtered;
};

export default DidNotEatForADayFilter;
