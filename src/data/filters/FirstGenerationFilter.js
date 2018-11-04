const FirstGenerationFilter = data => {
  const filtered = [];
  let firstGen;
  for (var i in data) {
    firstGen = data[i]["FirstGen"];
    if (firstGen === "Y") {
      filtered.push(data[i]);
    }
  }
  return filtered;
};

export default FirstGenerationFilter;
