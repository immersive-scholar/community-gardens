import SkipMealsFilter from "data/filters/SkipMealsFilter";

const SkipMeals = data => {
  const count = SkipMealsFilter(data).length;

  return {
    id: "skipMeals",
    label: `There are ${count} students who skipped meals last month.`,
    count
  };
};

export default SkipMeals;
