import WorkALotFilter from "data/filters/WorkALotFilter";
import AreHungryFilter from "data/filters/AreHungryFilter";

const WorkALotAndAreHungry = data => {
  const workALot = WorkALotFilter(data);
  const areHungry = AreHungryFilter(workALot);
  const count = areHungry.length;

  return {
    id: "workALotAndAreHungry",
    label: `There are ${count} students who work more than 30hrs/week but are hungry.`,
    count
  };
};

export default WorkALotAndAreHungry;
