import { Vector2, Vector3, Color } from "three-full";
import * as STATS from "constants/Stats";
import ColorFactory from "../util/ColorFactory";

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
  const resourcesIncoming = model.resourcesIncoming;
  const energyOutgoing = model.energyOutgoing;
  const communityFitness = model.communityFitness;
  const personalScarcity = model.personalScarcity;
  const emotionalHealth = model.emotionalHealth;
  const health = model.health;

  const didNotEatForADay = model[STATS.DID_NOT_EAT_FOR_A_DAY];
  const experienceHunger = model[STATS.EXPERIENCE_HUNGER];
  const foodInsecurity = model[STATS.FOOD_INSECURITY];
  const housingInsecurity = model[STATS.HOUSING_INSECURITY];
  const belowPovertyLine = model[STATS.BELOW_POVERTY_LINE];
  const earnALot = model[STATS.EARN_A_LOT];
  const earnALotAndAreHungry = model[STATS.EARN_A_LOT_AND_ARE_HUNGRY];
  const workALotAndAreHungry = model[STATS.WORK_A_LOT_AND_ARE_HUNGRY];
  const inhabitable = model[STATS.INHABITABLE];
  const pellGrant = model[STATS.PELL_GRANT];
  const skipMeals = model[STATS.SKIP_MEALS];
  const sleptOutside = model[STATS.SLEPT_OUTSIDE];
  const housingInsecurityScore = model[STATS.HOUSING_INSECURITY_SCORE];

  const age = model.Age;
  const gpa = model.GPA;
  const degree = model.Degree;

  let color,
    hslBase = {},
    hslRange = new Vector3();
  switch (true) {
    case health <= 0:
      props.color = ColorFactory.getRandomColor(
        ColorFactory.SUMMER,
        ColorFactory.LEAF
      );
      props.hslRange = new Vector3(0.1, 0.1, 0.2);
      break;
    case health > 0:
      props.color = ColorFactory.getRandomColor(
        ColorFactory.FALL,
        ColorFactory.LEAF
      );
      props.hslRange = new Vector3(0.1, 0.1, health / 100);
      break;
    default:
      break;
  }

  props.berryCount = Math.max(0, resourcesIncoming * 2);

  if (experienceHunger) {
    props.berryWireframe = true;
  }

  if (housingInsecurity) {
    props.windForce = housingInsecurityScore * 0.05;
    props.windDirection = new Vector3(
      R.floatBetween(-0.5, 0.5),
      R.floatBetween(-0.5, 0.5),
      R.floatBetween(-0.5, 0.5)
    );
  }

  if (foodInsecurity || housingInsecurity) {
    props.lookUpAt = true;
  }

  if (earnALot && !earnALotAndAreHungry) {
    props.sizeStart = new Vector2(0.2, 0.05);
    props.sizeEnd = new Vector2(0.3, 0.01);
  }

  if (belowPovertyLine) {
    new Color(props.color).getHSL(hslBase);
    props.hslBase = new Vector3(hslBase, 0.1, 0.2);
  }

  props.leafCount = age;

  switch (true) {
    case degree === 3:
      props.height = R.floatBetween(1, 2);
      break;
    case degree === 2:
      props.height = R.floatBetween(0.5, 1.5);
      break;
    case degree === 1:
    default:
      props.height = R.floatBetween(0.25, 1);
      break;
  }

  return props;
};

export default PlantModelToSolomonsSealProps;
