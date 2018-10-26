import EarningsFilter from "data/filters/EarningsFilter";
import AreHungryFilter from "data/filters/AreHungryFilter";

const EarnALotAndAreHungry = data => {
  const earningsCap = 1000;
  const earnALot = EarningsFilter(data, earningsCap);
  const areHungry = AreHungryFilter(earnALot);
  const count = areHungry.length;

  return {
    id: "earnALotAndAreHungry",
    label: `There are ${count} students who earn >$${earningsCap}/month but are often hungry.`,
    count
  };
};

export default EarnALotAndAreHungry;
