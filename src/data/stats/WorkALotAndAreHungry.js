import map from "lodash/map";
import WorkALotFilter from "data/filters/WorkALotFilter";
import AreHungryFilter from "data/filters/AreHungryFilter";
import { WORK_A_LOT_AND_ARE_HUNGRY } from "constants/Stats";

const WorkALotAndAreHungry = data => {
  const workALot = WorkALotFilter(data);
  const areHungry = AreHungryFilter(workALot);
  const count = areHungry.length;
  const ids = map(areHungry, row => row.ID);

  for (let i = 0; i < count; i++) {
    areHungry[i][WORK_A_LOT_AND_ARE_HUNGRY] = true;
  }

  return {
    id: WORK_A_LOT_AND_ARE_HUNGRY,
    label: `There are ${count} students who work more than 30hrs/week but are hungry.`,
    count,
    ids
  };
};

export default WorkALotAndAreHungry;
