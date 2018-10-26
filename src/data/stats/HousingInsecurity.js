const HousingInsecurity = (data, total) => {
  let count = 0;
  const labels = [
    "sleep52",
    "sleep62",
    "sleep72",
    "sleep82",
    "sleep92",
    "sleep102",
    "sleep112",
    "sleep132",
    "sleep142"
  ];

  let label;
  for (var l in labels) {
    label = labels[l];
    for (var i in data) {
      count += parseInt(data[i][label], 10) === 1 ? 1 : 0;
    }
  }

  let pct = Math.round((count / total) * 1000) / 10;

  return {
    id: "housingInsecurity",
    label: `${pct}% of students experienced homelessness over the last 12 months`,
    count
  };
};

export default HousingInsecurity;
