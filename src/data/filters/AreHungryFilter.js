const AreHungryFilter = (data, total) => {
  const filtered = [];
  const labels = [
    "Q36_1",
    "Q36_2",
    "Q36_3",
    "Q37_1",
    "Q37_2",
    "Q37_3",
    "Q37_4",
    "Q37_5",
    "Q37_6"
  ];

  let label;
  for (var l in labels) {
    label = labels[l];
    for (var i in data) {
      if (parseInt(data[i][label], 10) === 1) {
        filtered.push(data[i]);
      }
    }
  }

  return filtered;
};

export default AreHungryFilter;
