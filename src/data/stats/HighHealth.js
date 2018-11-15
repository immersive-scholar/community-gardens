import map from "lodash/map";
import HealthFilter from "data/filters/HealthFilter";
import { HIGH_HEALTH } from "constants/Stats";
import ColorFactory from "util/ColorFactory";

const HighHealth = (data, threshold = 0) => {
  const rows = HealthFilter(data, threshold);
  const count = rows.length;
  const ids = map(rows, row => row.ID);

  for (let i = 0; i < count; i++) {
    rows[i][HIGH_HEALTH] = true;
  }

  const bgColor = ColorFactory.getRandomColor(
    ColorFactory.SUMMER,
    ColorFactory.LEAF
  );

  const color = 0xffffff;

  return {
    id: HIGH_HEALTH,
    label: `${count} students have a high health score.`,
    count,
    ids,
    bgColor,
    color,
    textArray: [
      { size: 0.1, text: "GARDEN OF STUDENTS", offsetY: 1.2 },
      { size: 0.1, text: "Who have", offsetY: 1 },
      { size: 0.25, text: "Lots of Support", offsetY: 0.7 }
    ]
  };
};

export default HighHealth;
