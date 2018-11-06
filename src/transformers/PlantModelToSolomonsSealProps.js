import { Vector3, Vector2 } from "three-full";
import * as STATS from "constants/Stats";
import Modifiers from "./modifiers/";

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
  let props = {
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

  /* eslint-disable no-unused-vars */
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

  const age = parseInt(model.Age, 10);
  const gpa = parseInt(model.GPA, 10);
  const degree = parseInt(model.Degree, 10);
  const firstGen = model.FirstGen === "Y";
  const outOfState = parseInt(model.OutofState, 10);
  const shares =
    parseInt(model.sharemeals, 10) ||
    parseInt(model.givefood, 10) ||
    parseInt(model.sharemeals, 10);
  /* eslint-enable no-unused-vars */

  props = Modifiers.PersonalScarcityModifier({ props, personalScarcity });
  props = Modifiers.ResourcesIncomingModifier({ props, resourcesIncoming });
  props = Modifiers.CommunityFitnessModifier({ props, communityFitness });
  props = Modifiers.EnergyOutgoingModifier({ props, energyOutgoing });
  props = Modifiers.HealthModifier({ props, health });
  props = Modifiers.PellGrantModifier({ props, pellGrant });
  props = Modifiers.GPAModifier({ props, gpa });
  props = Modifiers.OutOfStateModifier({ props, outOfState });
  props = Modifiers.FirstGenModifier({ props, firstGen });
  props = Modifiers.EmotionalHealthModifier({ props, emotionalHealth });
  props = Modifiers.HousingInsecurityModifier({
    props,
    housingInsecurity,
    housingInsecurityScore,
    R
  });
  props = Modifiers.AgeModifier({ props, age });
  props = Modifiers.DegreeModifier({ props, degree, R });
  props = Modifiers.BelowPovertyLineModifier({ props, belowPovertyLine });
  props = Modifiers.InsecurityModifier({
    props,
    foodInsecurity,
    housingInsecurity
  });
  props = Modifiers.ShareModifier({ props, shares });

  // CUSTOM MODIFIERS
  // it's harder to follow extending a modifier to accept a bunch of params
  // than to just apply params here
  // IMHO that is :)

  // housing insecurity displaces leaves from stems
  // there is a housingInsecurityModifier but the values are different
  if (housingInsecurity || true) {
    props.windForce = R.floatBetween(0.1, 0.5);
    props.windDirection = new Vector3(
      R.floatBetween(-0.5, 0.5),
      R.floatBetween(-0.5, 0.5),
      R.floatBetween(-0.5, 0.5)
    );
  }

  // bigger leaves for those who earn a lot but are not hungry
  if (earnALot && !earnALotAndAreHungry) {
    props.sizeStart = new Vector2(0.2, 0.05);
    props.sizeEnd = new Vector2(0.3, 0.01);
  }

  props.berryCount =
    R.intBetween(1, 4) * Math.max(24, Math.abs(resourcesIncoming));

  return props;
};

export default PlantModelToSolomonsSealProps;
