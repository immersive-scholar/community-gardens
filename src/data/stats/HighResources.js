import map from "lodash/map";
import ResourcesFilter from "data/filters/ResourcesFilter";
import { HIGH_RESOURCES } from "constants/Stats";
import ColorFactory from "util/ColorFactory";

const HighResources = (data, threshold = 1) => {
  const rows = ResourcesFilter(data, threshold);
  const count = rows.length;
  const ids = map(rows, row => row.ID);

  for (let i = 0; i < count; i++) {
    rows[i][HIGH_RESOURCES] = true;
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
    id: HIGH_RESOURCES,
    label: `${count} students have a high resources.`,
    count,
    ids,
    bgColor,
    color,
    textArray: [
      { size: 0.1, text: "GARDEN OF STUDENTS", offsetY: 1.2 },
      { size: 0.1, text: "Who have", offsetY: 1 },
      { size: 0.25, text: "High Resources", offsetY: 0.7 }
    ]
  };
};

export default HighResources;
