import map from "lodash/map";
import uniqBy from "lodash/uniqBy";
import { HOUSING_INSECURITY } from "constants/Stats";

const HousingInsecurity = (data, total) => {
  const labels = [
    "sleep52", // at a shelter
    "sleep62", // in a camper
    "sleep72", // temp with friend until find housing
    "sleep82", // temp at hotel, no permanent home
    "sleep92", // transitional housing
    "sleep102", // group home
    "sleep112", // treatment center
    "sleep122", // outdoor, on the street
    "sleep132" // space not intended for habitation
  ];

  let label,
    match,
    rows = [];
  for (var l in labels) {
    label = labels[l];
    for (var i in data) {
      match = parseInt(data[i][label], 10) === 1;
      if (match) {
        data[i][HOUSING_INSECURITY] = true;
        rows.push(data[i]);
      }
    }
  }

  const uniq = uniqBy(rows, row => row.ID);
  const count = uniq.length;
  const pct = Math.round((count / total) * 1000) / 10;
  const ids = map(uniq, row => row.ID);

  return {
    id: HOUSING_INSECURITY,
    label: `${pct}% of students experienced homelessness over the last 12 months`,
    count,
    ids
  };
};

export default HousingInsecurity;
