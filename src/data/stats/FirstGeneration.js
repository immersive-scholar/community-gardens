import map from "lodash/map";
import FirstGenerationFilter from "data/filters/FirstGenerationFilter";
import { FIRST_GENERATION } from "constants/Stats";
import ColorFactory from "util/ColorFactory";

const HousingInsecurity = data => {
  const rows = FirstGenerationFilter(data);
  const count = rows.length;
  const ids = map(rows, row => row.ID);

  for (let i = 0; i < count; i++) {
    rows[i][FIRST_GENERATION] = true;
  }

  const bgColor = ColorFactory.getRandomColor(
    ColorFactory.FALL,
    ColorFactory.LEAF
  );

  return {
    id: FIRST_GENERATION,
    label: `${count} students are first generation.`,
    count,
    ids,
    bgColor,
    color: 0xffffff,
    textArray: [
      { size: 0.35, text: "FIRST", offsetY: 1.2 },
      { size: 0.35, text: "GENERATION", offsetY: 0.7 },
    ],
  };
};

export default HousingInsecurity;
