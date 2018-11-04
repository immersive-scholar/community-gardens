import { Vector3 } from "three-full";

const PersonalScarcityModifier = ({ props, personalScarcity }) => {
  if (personalScarcity) {
    props.petalTarget = new Vector3(0, personalScarcity * 0.01, -1);
  }
  return props;
};

export default PersonalScarcityModifier;
