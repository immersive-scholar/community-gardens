import map from "lodash/map";
import SkipMealsFilter from "data/filters/SkipMealsFilter";
import { SKIP_MEALS } from "constants/Stats";

const SkipMeals = data => {
  const rows = SkipMealsFilter(data);
  const count = rows.length;
  const ids = map(rows, row => row.ID);

  for (let i = 0; i < count; i++) {
    rows[i][SKIP_MEALS] = true;
  }

  return {
    id: SKIP_MEALS,
    label: `There are ${count} students who skipped meals last month.`,
    count,
    ids
  };
};

export default SkipMeals;
