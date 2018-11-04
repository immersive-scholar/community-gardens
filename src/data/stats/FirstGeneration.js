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
    ColorFactory.WINTER,
    ColorFactory.SKY
  );

  return {
    id: FIRST_GENERATION,
    label: `${count} students are first generation.`,
    count,
    ids,
    bgColor,
    color: 0xffffff,
    textArray: [
      { size: 0.1, text: "GARDEN OF STUDENTS", offsetY: 1.2 },
      { size: 0.25, text: "First Generation", offsetY: 0.8 }
    ]
  };
};

export default HousingInsecurity;
