import map from "lodash/map";
import WellnessFilter from "data/filters/WellnessFilter";
import { WELLNESS } from "constants/Stats";
import ColorFactory from "util/ColorFactory";

const Wellness = data => {
  const rows = WellnessFilter(data);
  const count = rows.length;
  const ids = map(rows, row => row.ID);

  for (let i = 0; i < count; i++) {
    rows[i][WELLNESS] = true;
  }

  const bgColor = ColorFactory.getRandomColor(
    ColorFactory.FALL,
    ColorFactory.LEAF
  );

  const color = ColorFactory.getRandomColor(
    ColorFactory.WINTER,
    ColorFactory.SKY
  );

  return {
    id: WELLNESS,
    label: `${count} students are first generation.`,
    count,
    ids,
    bgColor,
    color,
    textArray: [
      { size: 0.35, text: "HAPPY", offsetY: 1.2 },
      { size: 0.35, text: "GARDEN", offsetY: 0.7 },
    ],
  };
};

export default Wellness;
