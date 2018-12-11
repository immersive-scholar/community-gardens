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
      { size: 0.35, text: "GARDEN OF", offsetY: 1.2 },
      { size: 0.35, text: "HUNGER", offsetY: 0.7 },
    ],
  };
};

export default HousingInsecurity;
