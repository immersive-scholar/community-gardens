import map from "lodash/map";
import WorkALotFilter from "data/filters/WorkALotFilter";
import AreHungryFilter from "data/filters/AreHungryFilter";

const WorkALotAndAreHungry = data => {
  const workALot = WorkALotFilter(data);
  const areHungry = AreHungryFilter(workALot);
  const count = areHungry.length;
  const ids = map(areHungry, row => row.ID);

  return {
    id: "workALotAndAreHungry",
    label: `There are ${count} students who work more than 30hrs/week but are hungry.`,
    count,
    ids
  };
};

export default WorkALotAndAreHungry;
