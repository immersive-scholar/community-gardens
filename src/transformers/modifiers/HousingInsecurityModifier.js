import { Vector3 } from "three-full";

const HousingInsecurityModifier = ({
  props,
  housingInsecurity,
  housingInsecurityScore,
  R
}) => {
  // housing insecurity displaces leaves from stems
  if (housingInsecurity) {
    const s = Math.min(0.3, housingInsecurityScore * 0.1);
    props.windForce = s;
    props.windDirection = new Vector3(s, s, 0);
  }

  return props;
};

export default HousingInsecurityModifier;
