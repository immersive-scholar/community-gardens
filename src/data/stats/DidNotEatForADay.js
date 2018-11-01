import map from "lodash/map";
import DidNotEatForADayFilter from "data/filters/DidNotEatForADayFilter";
import { DID_NOT_EAT_FOR_A_DAY } from "constants/Stats";

const DidNotEatForADay = (data, total) => {
  const rows = DidNotEatForADayFilter(data);
  const count = rows.length;
  const pct = Math.round((count / total) * 1000) / 10;
  const ids = map(rows, r => r.ID);

  for (let i = 0; i < count; i++) {
    rows[i][DID_NOT_EAT_FOR_A_DAY] = true;
  }

  return {
    id: DID_NOT_EAT_FOR_A_DAY,
    label: `${pct}% of students do not eat for an entire day during the past month`,
    count,
    ids
  };
};

export default DidNotEatForADay;
