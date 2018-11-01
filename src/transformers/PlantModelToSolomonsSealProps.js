import { Vector3 } from "three-full";
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
  const didNotEatForADay = model[STATS.DID_NOT_EAT_FOR_A_DAY];
  const housingInsecurity = model[STATS.HOUSING_INSECURITY];
  const earnALotAndAreHungry = model[STATS.EARN_A_LOT_AND_ARE_HUNGRY];
  const experienceHunger = model[STATS.EXPERIENCE_HUNGER];
  const inhabitable = model[STATS.INHABITABLE];
  const pellGrant = model[STATS.PELL_GRANT];
  const skipMeals = model[STATS.SKIP_MEALS];
  const sleptOutside = model[STATS.SLEPT_OUTSIDE];
  const workALotAndAreHungry = model[STATS.WORK_A_LOT_AND_ARE_HUNGRY];

  if (housingInsecurity) {
    props.windForce = R.floatBetween(0.2, 0.5);
    props.windDirection = new Vector3(
      R.floatBetween(-0.5, 0.5),
      0,
      R.floatBetween(-0.5, 0.5)
    );
  }

  if (didNotEatForADay) {
    props.pointCount = 10;
    // props.displacement = new Vector3(1, 0.5, 1); // anxious
    // props.scale = new Vector3(8, 8, 16);
    // props.berryCount = 10;
    props.berryStartPoint = 0.1;
    props.berryEndPoint = 0.3;
    props.berrySpiral = 360;
  }

  return props;
};

export default PlantModelToSolomonsSealProps;
