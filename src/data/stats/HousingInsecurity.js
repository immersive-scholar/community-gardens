import map from "lodash/map";

import HousingInsecurityFilter from "data/filters/HousingInsecurityFilter";
import { HOUSING_INSECURITY, HOUSING_INSECURITY_SCORE } from "constants/Stats";
import ColorFactory from "util/ColorFactory";

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

  const bgColor = ColorFactory.getRandomColor(
    ColorFactory.WINTER,
    ColorFactory.SKY
  );

  return {
    id: HOUSING_INSECURITY,
    label: `${count} students experienced housing insecurity.`,
    count,
    ids,
    bgColor,
    color: 0xffffff,
    textArray: [
      { size: 0.1, text: "GARDEN OF STUDENTS", offsetY: 1.2 },
      { size: 0.1, text: "Who Have Experienced", offsetY: 1 },
      { size: 0.25, text: "Housing Insecurity", offsetY: 0.7 }
    ]
  };
};

export default HousingInsecurity;
