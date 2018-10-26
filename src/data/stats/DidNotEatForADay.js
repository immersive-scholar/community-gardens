import map from "lodash/map";
import DidNotEatForADayFilter from "data/filters/DidNotEatForADayFilter";

const DidNotEatForADay = (data, total) => {
  const rows = DidNotEatForADayFilter(data);
  const count = rows.length;
  const pct = Math.round((count / total) * 1000) / 10;
  const ids = map(rows, r => r.ID);

  return {
    id: "didNotEatForADay",
    label: `${pct}% of students do not eat for an entire day during the past month`,
    count,
    ids
  };
};

export default DidNotEatForADay;
