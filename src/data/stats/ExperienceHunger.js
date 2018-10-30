import map from "lodash/map";
import AreHungryFilter from "data/filters/AreHungryFilter";
import { EXPERIENCE_HUNGER } from "constants/Stats";

const ExperienceHunger = (data, total) => {
  const areHungry = AreHungryFilter(data);
  const count = areHungry.length;
  const pct = Math.round((count / total) * 1000) / 10;
  const ids = map(areHungry, row => row.ID);

  for (let i = 0; i < count; i++) {
    areHungry[i][EXPERIENCE_HUNGER] = true;
  }

  return {
    id: EXPERIENCE_HUNGER,
    label: `${pct}% of NCSU students frequently experience hunger.`,
    count,
    ids
  };
};

export default ExperienceHunger;
