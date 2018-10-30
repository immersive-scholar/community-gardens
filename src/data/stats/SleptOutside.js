import map from "lodash/map";
import { SLEPT_OUTSIDE } from "constants/Stats";

const SleptOutside = data => {
  let count = 0,
    match;
  const rows = [];
  for (var i in data) {
    match = parseInt(data[i]["sleep121"], 10) === 1;
    if (match) {
      rows.push(data[i]);
      data[i][SLEPT_OUTSIDE] = true;
    }
  }

  count = rows.length;
  const ids = map(rows, row => row.ID);

  return {
    id: SLEPT_OUTSIDE,
    label: `Last month, ${count} students slept outside on the street.`,
    count,
    ids
  };
};

export default SleptOutside;
