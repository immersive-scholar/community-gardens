import { Vector2, Vector3 } from "three-full";
import * as STATS from "constants/Stats";

const PlantModelToSolomonsSealProps = ({
  model,
  stats,
  i,
  delay = 0,
  instanceDelay = 0.5,
  R
}) => {
  // these are the default props
  // which result in a pleasing amount of variety within each plant
  const props = {
    lazy: true,
    delay: delay + i * instanceDelay,
    leafCount: R.intBetween(12, 24),
    hslBase: new Vector3(1, R.floatBetween(0, 0.5), R.floatBetween(0, 0.5)),
    hslRange: new Vector3(
      R.floatBetween(0, 0.2),
      R.floatBetween(0.2, 0.4),
      R.floatBetween(0.2, 0.5)
    ),
    berryCount: R.intBetween(24, 96),
    berryDistanceFromStem: R.floatBetween(0.015, 0.05)
    // berryDisplacement: new Vector2(
    //   R.floatBetween(-0.4, 0.4),
    //   R.floatBetween(-0.4, 0.4)
    // )
    // offset: new Vector3(x * 0.02, (x + y) * 0.02, y * 0.02)
  };

  // if any of these triggers are true,
  // we will adjust the props accordingly
  const didNotEatForADay = 0; //model[STATS.DID_NOT_EAT_FOR_A_DAY];
  const experienceHunger = 0; //model[STATS.EXPERIENCE_HUNGER];
  const housingInsecurity = 0; //model[STATS.HOUSING_INSECURITY];
  const earnALot = 1; //model[STATS.EARN_A_LOT];
  const earnALotAndAreHungry = 1; //model[STATS.EARN_A_LOT_AND_ARE_HUNGRY];
  const workALotAndAreHungry = model[STATS.WORK_A_LOT_AND_ARE_HUNGRY];
  const inhabitable = model[STATS.INHABITABLE];
  const pellGrant = model[STATS.PELL_GRANT];
  const skipMeals = model[STATS.SKIP_MEALS];
  const sleptOutside = model[STATS.SLEPT_OUTSIDE];

  if (didNotEatForADay) {
    // props.pointCount = 10;
    // props.displacement = new Vector3(1, 0.5, 1); // anxious
    // props.scale = new Vector3(8, 8, 16);
    props.berryCount = 0;
  }

  if (experienceHunger) {
    props.berryWireframe = true;
  }

  if (housingInsecurity) {
    props.windForce = R.floatBetween(0.25, 0.75);
    props.windDirection = new Vector3(
      R.floatBetween(-0.5, 0.5),
      R.floatBetween(-0.5, 0.5),
      R.floatBetween(-0.5, 0.5)
    );
  }

  if (earnALot) {
    props.height = R.floatBetween(1, 2);
    props.leafCount = props.height * 15;
    props.sizeStart = new Vector2(0.05, 0.03);
    props.sizeEnd = new Vector2(0.2, 0.15);
  }

  return props;
};

export default PlantModelToSolomonsSealProps;
