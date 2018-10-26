import map from "lodash/map";

const Inhabitable = data => {
  let count = 0,
    match;
  const rows = [];
  for (var i in data) {
    match = parseInt(data[i]["sleep132"], 10) === 1;
    count += match ? 1 : 0;
    if (match) rows.push(data[i]);
  }

  const ids = map(rows, row => row.ID);

  return {
    id: "inhabitable",
    label: `Last year, ${count} students lived in a place not intended for human habitation.`,
    count,
    ids
  };
};

export default Inhabitable;
