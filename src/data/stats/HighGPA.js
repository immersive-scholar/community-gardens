import map from "lodash/map";
import GPAFilter from "data/filters/GPAFilter";
import { HIGH_GPA } from "constants/Stats";
import ColorFactory from "util/ColorFactory";

const HighGPA = data => {
  const rows = GPAFilter(data, 3);
  const count = rows.length;
  const ids = map(rows, row => row.ID);

  for (let i = 0; i < count; i++) {
    rows[i][HIGH_GPA] = true;
  }

  const bgColor = ColorFactory.getRandomColor(
    ColorFactory.SUMMER,
    ColorFactory.LEAF
  );

  const color = ColorFactory.getRandomColor(
    ColorFactory.WINTER,
    ColorFactory.SKY
  );

  return {
    id: HIGH_GPA,
    label: `${count} students have a 4.0 GPA.`,
    count,
    ids,
    bgColor,
    color,
    textArray: [
      { size: 0.35, text: "HIGH GPA", offsetY: 1.2 },
      { size: 0.35, text: "GARDEN", offsetY: 0.7 },
    ],
  };
};

export default HighGPA;
