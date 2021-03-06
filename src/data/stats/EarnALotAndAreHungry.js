import map from "lodash/map";
import EarningsFilter from "data/filters/EarningsFilter";
import AreHungryFilter from "data/filters/AreHungryFilter";
import { EARN_A_LOT_AND_ARE_HUNGRY } from "constants/Stats";

const EarnALotAndAreHungry = data => {
  const earningsCap = 1000;
  const earnALot = EarningsFilter(data, earningsCap);
  const areHungry = AreHungryFilter(earnALot);
  const count = areHungry.length;
  const ids = map(areHungry, row => row.ID);

  for (let i = 0; i < count; i++) {
    areHungry[i][EARN_A_LOT_AND_ARE_HUNGRY] = true;
  }

  return {
    id: EARN_A_LOT_AND_ARE_HUNGRY,
    label: `There are ${count} students who earn >$${earningsCap}/month but are often hungry.`,
    count,
    ids
  };
};

export default EarnALotAndAreHungry;
