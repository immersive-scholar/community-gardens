import { Vector3 } from "three-full";

const EmotionalHealthModifier = ({ props, emotionalHealth }) => {
  // render low emotional health scores with sharper angles

  if (emotionalHealth < 0) {
    props.pointCount = Math.max(10, 10 + emotionalHealth);
    props.scale = new Vector3(
      -emotionalHealth,
      -emotionalHealth,
      -emotionalHealth
    );
  }

  return props;
};

export default EmotionalHealthModifier;
