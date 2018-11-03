import { Vector3 } from "three-full";

const HousingInsecurityModifier = ({
  props,
  housingInsecurity,
  housingInsecurityScore
}) => {
  // housing insecurity displaces leaves from stems
  if (housingInsecurity) {
    props.windForce = -housingInsecurityScore * 0.05;
    props.windDirection = new Vector3(
      housingInsecurityScore * 0.01,
      housingInsecurityScore * 0.01,
      0 //R.floatBetween(0, 0.3)
    );
  }

  return props;
};

export default HousingInsecurityModifier;
