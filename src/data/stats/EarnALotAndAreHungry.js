import map from "lodash/map";
import EarningsFilter from "data/filters/EarningsFilter";
import AreHungryFilter from "data/filters/AreHungryFilter";

const EarnALotAndAreHungry = data => {
  const earningsCap = 1000;
  const earnALot = EarningsFilter(data, earningsCap);
  const areHungry = AreHungryFilter(earnALot);
  const count = areHungry.length;
  const ids = map(areHungry, row => row.ID);

  return {
    id: "earnALotAndAreHungry",
    label: `There are ${count} students who earn >$${earningsCap}/month but are often hungry.`,
    count,
    ids
  };
};

export default EarnALotAndAreHungry;
