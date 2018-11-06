import { Vector3 } from "three-full";
import * as STATS from "constants/Stats";
import Modifiers from "./modifiers/";

const PlantModelToStellariaPuberaProps = ({
  model,
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
    petalCount: R.intBetween(12, 24),
    petalWidth: 0.025,
    petalLength: 0.25,
    hslBase: new Vector3(1, R.floatBetween(0, 0.5), R.floatBetween(0, 0.5)),
    hslRange: new Vector3(
      R.floatBetween(0, 0.05),
      R.floatBetween(0.1, 0.25),
      R.floatBetween(0.1, 0.25)
    ),
    berryCount: R.intBetween(16, 32),
    berryDistanceFromStem: R.floatBetween(0.015, 0.05),
    petalDistanceFromCenter: 0.01
    // openness: 0,
    // berryCount: R.intBetween(16, 32),
    // berryDistanceFromStem: R.floatBetween(0.01, 0.08),
    // berrySpiralDepth: R.floatBetween(0.01, 0.15),
    // offset: new Vector3(x * 0.02, (x + y) * 0.02, y * 0.02)
  };

  // if any of these triggers are true,
  // we will adjust the props accordingly

  /* eslint-enable no-unused-vars */
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

  const age = parseInt(model.Age, 10);
  const gpa = parseInt(model.GPA, 10);
  const degree = parseInt(model.Degree, 10);
  const firstGen = model.FirstGen === "Y";
  const outOfState = parseInt(model.OutofState, 10);
  const shares =
    parseInt(model.sharemeals, 10) ||
    parseInt(model.givefood, 10) ||
    parseInt(model.sharemeals, 10);
  /* eslint-disable no-unused-vars */

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

  // CUSTOM
  // it's harder to follow extending a modifier to accept a bunch of params
  // than to just apply params here
  // IMHO that is :)

  // the more resources Incoming you have, the more berries are created.
  props.berryCount = Math.max(10, resourcesIncoming * 5);

  // housing insecurity displaces leaves from stems
  if (housingInsecurity) {
    props.windForce = R.floatBetween(0.1, 0.3);
    props.windDirection = new Vector3(
      R.floatBetween(-0.5, 0.5),
      R.floatBetween(-0.5, 0.5),
      R.floatBetween(-0.5, 0.5)
    );
  }

  // props.petalCount = 8;

  return props;
};

export default PlantModelToStellariaPuberaProps;
