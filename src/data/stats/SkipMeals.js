import map from "lodash/map";
import SkipMealsFilter from "data/filters/SkipMealsFilter";

const SkipMeals = data => {
  const rows = SkipMealsFilter(data);
  const count = rows.length;
  const ids = map(rows, row => row.ID);

  return {
    id: "skipMeals",
    label: `There are ${count} students who skipped meals last month.`,
    count,
    ids
  };
};

export default SkipMeals;
