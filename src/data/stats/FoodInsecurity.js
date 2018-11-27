import map from "lodash/map";
import FoodInsecurityFilter from "data/filters/FoodInsecurityFilter";
import { FOOD_INSECURITY } from "constants/Stats";
import ColorFactory from "util/ColorFactory";

const HousingInsecurity = data => {
  const rows = FoodInsecurityFilter(data);
  const count = rows.length;
  const ids = map(rows, row => row.ID);

  for (let i = 0; i < count; i++) {
    rows[i][FOOD_INSECURITY] = true;
  }

  const bgColor = ColorFactory.getRandomColor(
    ColorFactory.WINTER,
    ColorFactory.SKY
  );

  return {
    id: FOOD_INSECURITY,
    label: `${count} students experienced food insecurity.`,
    count,
    ids,
    bgColor,
    color: 0xffffff,
    textArray: [
      { size: 0.1, text: "GARDEN OF STUDENTS", offsetY: 1.4 },
      { size: 0.25, text: "Who Experience", offsetY: 1 },
      { size: 0.25, text: "Food Insecurity", offsetY: 0.6 }
    ]
  };
};

export default HousingInsecurity;
