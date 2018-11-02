import map from "lodash/map";
import EarningsFilter from "data/filters/EarningsFilter";
import { EARN_A_LOT } from "constants/Stats";

const EarnALot = (data, total) => {
  const earningsCap = 2000;
  const rows = EarningsFilter(data, earningsCap, ">");
  const count = rows.length;
  const ids = map(rows, row => row.ID);
  const pct = Math.round((count / total) * 1000) / 10;

  for (let i = 0; i < count; i++) {
    rows[i][EARN_A_LOT] = true;
  }

  return {
    id: EARN_A_LOT,
    label: `${pct}% of students earn >$${earningsCap}/month.`,
    count,
    ids
  };
};

export default EarnALot;
