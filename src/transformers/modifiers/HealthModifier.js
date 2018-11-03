import { Vector3 } from "three-full";

import ColorFactory from "util/ColorFactory";

const HealthModifier = ({ props, health }) => {
  // health changes color from summer to fall
  // and also makes the leaves darker.
  // and make the leaves point down towards the bottom of the stem.
  // and also 'opens' the leaves
  let droop;
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

  return props;
};

export default HealthModifier;
