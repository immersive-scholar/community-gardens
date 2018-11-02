import map from "lodash/map";
import HousingInsecurityFilter from "data/filters/HousingInsecurityFilter";
import { HOUSING_INSECURITY, HOUSING_INSECURITY_SCORE } from "constants/Stats";

const HousingInsecurity = data => {
  const rows = HousingInsecurityFilter(data);
  const count = rows.length;
  const ids = map(rows, row => row.ID);

  for (let i = 0; i < count; i++) {
    rows[i][HOUSING_INSECURITY] = true;
  }

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

  let label, match, score;
  for (var i in rows) {
    score = 0;
    for (var l in labels) {
      label = labels[l];
      match = parseInt(rows[i][label], 10) === 1;
      if (match) {
        score++;
      }
    }
    rows[i][HOUSING_INSECURITY_SCORE] = score;
  }

  return {
    id: HOUSING_INSECURITY,
    label: `${count} students experienced housing insecurity.`,
    count,
    ids
  };
};

export default HousingInsecurity;
