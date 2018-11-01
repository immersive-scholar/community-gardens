import map from "lodash/map";
import EarningsFilter from "data/filters/EarningsFilter";
import { EARN_A_LOT } from "constants/Stats";

const EarnALot = data => {
  const earningsCap = 1000;
  const rows = EarningsFilter(data, earningsCap);
  const count = rows.length;
  const ids = map(rows, row => row.ID);

  for (let i = 0; i < count; i++) {
    rows[i][EARN_A_LOT] = true;
  }

  return {
    id: EARN_A_LOT,
    label: `There are ${count} students who earn >$${earningsCap}/month.`,
    count,
    ids
  };
};

export default EarnALot;
