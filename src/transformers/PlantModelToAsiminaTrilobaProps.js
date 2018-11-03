import { Vector3, Color } from "three-full";
import * as STATS from "constants/Stats";
import TextureFactory from "util/TextureFactory";
import ColorFactory from "util/ColorFactory";

const PlantModelToAsiminaTrilobaProps = ({
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
    petalCount: R.intBetween(6, 12),
    hslBase: new Vector3(
      1,
      R.floatBetween(0.6, 0.95),
      R.floatBetween(0.8, 0.95)
    ),
    hslRange: new Vector3(
      R.floatBetween(0, 0.1),
      R.floatBetween(0.02, 0.05),
      R.floatBetween(0.02, 0.05)
    ),
    petalWidth: R.floatBetween(0.1, 0.3),
    petalLength: R.floatBetween(0.05, 0.15),
    berryCount: R.intBetween(16, 32),
    berryDistanceFromStem: R.floatBetween(0.015, 0.05)
    // openness: 0,
    // berryCount: R.intBetween(16, 32),
    // berryDistanceFromStem: R.floatBetween(0.01, 0.08),
    // berrySpiralDepth: R.floatBetween(0.01, 0.15),
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
  const firstGen = model.FirstGen;
  const outOfState = model.OutofState;

  // health changes color from summer to fall
  // and also makes the leaves darker.
  // and make the leaves point down towards the bottom of the stem.
  let color,
    droop,
    hslBase = {},
    hslRange = new Vector3();
  switch (true) {
    case health <= -10:
      props.color = ColorFactory.getRandomColor(
        ColorFactory.WINTER,
        ColorFactory.LEAF
      );
      props.leafColor = ColorFactory.getRandomColor(
        ColorFactory.WINTER,
        ColorFactory.SKY
      );
      // props.berryColor = props.leafColor;
      props.hslRange = new Vector3(0.1, 0.1, -0.5);
      droop = (Math.PI / 2) * health * 0.03;
      props.rotationStart = new Vector3(droop, 0, 0);
      break;
    case health <= 0:
      props.color = ColorFactory.getRandomColor(
        ColorFactory.SUMMER,
        ColorFactory.LEAF
      );
      props.hslRange = new Vector3(0.1, 0.1, 0.2);
      droop = (Math.PI / 2) * health * 0.03;
      props.rotationStart = new Vector3(droop, 0, 0);
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

  props.openness = health * 0.1;

  if (pellGrant) {
    props.color = 0xfbd58e;
    props.leafColor = 0xffffff;
    const color = new Color(props.color);
    let hsl = {};
    color.getHSL(hsl);
    props.hslBase = new Vector3(hsl.h, hsl.s, hsl.l);
    props.hslRange = new Vector3(0, 0.1, 0.2);
  }

  props.berryDistanceFromStem = gpa * 0.02;

  //
  if (personalScarcity) {
    props.petalTarget = new Vector3(0, personalScarcity * 0.1, -1);
  }

  // TODO add bees
  if (communityFitness) {
  }

  // TODO give food get mushrooms
  // "letstay": 1,
  // "givefood": 1,
  // "sharemeals": 2,

  // berries are not 'full' if food insecure
  // if (foodInsecurity) {
  //    props.wireframe = true;
  // }

  // Different types of leaves for specific attributes
  props.imagePath = TextureFactory.getStroke();
  if (outOfState) {
    props.imagePath = `${process.env.PUBLIC_URL}/img/patterns/topography.png`;
  }
  if (firstGen) {
    props.imagePath = `${process.env.PUBLIC_URL}/img/patterns/maze.png`;
  }
  if (gpa > 3) {
    props.imagePath = TextureFactory.getLine();
  }

  // render low emotional health scores with sharper angles
  if (emotionalHealth < 0) {
    props.pointCount = Math.max(10, 10 + emotionalHealth);
    props.scale = new Vector3(
      -emotionalHealth,
      -emotionalHealth,
      -emotionalHealth
    );
  }

  // the more resources Incoming you have, the more berries are created.
  props.berryCount = Math.max(10, resourcesIncoming * 5);

  // housing insecurity displaces leaves from stems
  if (housingInsecurity) {
    props.windForce = -housingInsecurityScore * 0.05;
    props.windDirection = new Vector3(
      R.floatBetween(0, 0.3),
      R.floatBetween(0, 0.3),
      0 //R.floatBetween(0, 0.3)
    );
  }

  // camera looks up at food insecure or housing insecure
  if (foodInsecurity || housingInsecurity) {
    props.lookUpAt = true;
  }

  // bigger leaves for those who earn a lot but are not hungry
  if (earnALot && !earnALotAndAreHungry) {
    // props.petalWidth = props.petalWidth * 1.5;
    // props.petalLength = 0.25;
  }

  // dark colors if below poverty line
  // if (belowPovertyLine) {
  //   new Color(props.color).getHSL(hslBase);
  //   props.hslBase = new Vector3(hslBase.h, 0.1, 0.2);
  // }

  // more leaves the older you are
  props.petalCount = age;
  props.thickness = age * 0.001;

  // taller plants represent more senior Degrees
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

export default PlantModelToAsiminaTrilobaProps;
