import map from "lodash/map";

const SleptOutside = data => {
  let count = 0,
    match;
  const rows = [];
  for (var i in data) {
    match = parseInt(data[i]["sleep121"], 10) === 1;
    if (match) rows.push(data[i]);
  }

  count = rows.length;
  const ids = map(rows, row => row.ID);

  return {
    id: "sleptOutside",
    label: `Last month, ${count} students slept outside on the street.`,
    count,
    ids
  };
};

export default SleptOutside;
