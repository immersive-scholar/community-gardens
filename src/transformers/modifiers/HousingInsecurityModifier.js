import { Vector3 } from "three-full";

const HousingInsecurityModifier = ({
  props,
  housingInsecurity,
  housingInsecurityScore,
  R
}) => {
  // housing insecurity displaces leaves from stems
  if (housingInsecurity) {
    const max = housingInsecurityScore > 1 ? 0.5 : 0.3;
    // props.windForce = R.floatBetween(0.1, max);
    props.windForce = housingInsecurityScore * 0.5;
    props.windDirection = new Vector3(
      R.floatBetween(0, max),
      R.floatBetween(0, max),
      0
    );
  }

  return props;
};

export default HousingInsecurityModifier;
