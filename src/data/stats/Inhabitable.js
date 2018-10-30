import map from "lodash/map";
import { INHABITABLE } from "constants/Stats";

const Inhabitable = data => {
  let count = 0,
    match;
  const rows = [];
  for (var i in data) {
    match = parseInt(data[i]["sleep132"], 10) === 1;
    count += match ? 1 : 0;
    if (match) {
      rows.push(data[i]);
      data[i][INHABITABLE] = true;
    }
  }

  const ids = map(rows, row => row.ID);

  return {
    id: INHABITABLE,
    label: `Last year, ${count} students lived in a place not intended for human habitation.`,
    count,
    ids
  };
};

export default Inhabitable;
