import map from "lodash/map";
import HealthFilter from "data/filters/HealthFilter";
import { LOW_HEALTH } from "constants/Stats";
import ColorFactory from "util/ColorFactory";

const LowHealth = (data, threshold = 0) => {
  const rows = HealthFilter(data, threshold, "<");
  const count = rows.length;
  const ids = map(rows, row => row.ID);

  for (let i = 0; i < count; i++) {
    rows[i][LOW_HEALTH] = true;
  }

  const bgColor = ColorFactory.getRandomColor(
    ColorFactory.WINTER,
    ColorFactory.SKY
  );

  // const color = ColorFactory.getRandomColor(
  //   ColorFactory.WINTER,
  //   ColorFactory.SKY
  // );

  const color = 0xffffff;

  return {
    id: LOW_HEALTH,
    label: `${count} students have a low resourcing score.`,
    count,
    ids,
    bgColor,
    color,
    textArray: [
      { size: 0.35, text: "WINTER", offsetY: 1.2 },
      { size: 0.35, text: "GARDEN", offsetY: 0.7 },
    ],
  };
};

export default LowHealth;
