import map from "lodash/map";
import FoodInsecurityFilter from "data/filters/FoodInsecurityFilter";
import { FOOD_INSECURITY } from "constants/Stats";

const HousingInsecurity = data => {
  const rows = FoodInsecurityFilter(data);
  const count = rows.length;
  const ids = map(rows, row => row.ID);

  for (let i = 0; i < count; i++) {
    rows[i][FOOD_INSECURITY] = true;
  }

  return {
    id: FOOD_INSECURITY,
    label: `${count} students experienced food insecurity.`,
    count,
    ids
  };
};

export default HousingInsecurity;
