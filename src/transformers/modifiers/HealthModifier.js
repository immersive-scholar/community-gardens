import { Vector3, Color } from "three-full";

import ColorFactory from "util/ColorFactory";

const HealthModifier = ({ props, health }) => {
  // health changes color from summer to fall
  // and also makes the leaves darker.
  // and make the leaves point down towards the bottom of the stem.
  // and also 'opens' the leaves
  let droop,
    c,
    hslObject = {},
    healthOffset = 1;
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

      droop = (Math.PI / 2) * health * 0.01;
      props.rotationStart = new Vector3(droop, 0, 0);
      break;
    case health > 10 && health <= 0:
      props.color = ColorFactory.getRandomColor(
        ColorFactory.SUMMER,
        ColorFactory.LEAF
      );

      props.hslRange = new Vector3(0.1, 0.1, 0.2);
      droop = (Math.PI / 2) * health * 0.02;
      props.rotationStart = new Vector3(droop, 0, 0);
      break;
    case health > 0:
      props.color = ColorFactory.getRandomColor(
        ColorFactory.SUMMER,
        ColorFactory.LEAF
      );

      props.hslRange = new Vector3(0.1, 0.1, health / 100);
      props.imagePath = `${
        process.env.PUBLIC_URL
      }/img/strokes/watercolor-1.png`;
      break;
    default:
      break;
  }

  if (health < 0) {
    healthOffset = 1 + health / 30;

    healthOffset = Math.min(1, Math.max(0, healthOffset));

    c = new Color(props.color);
    c.getHSL(hslObject);
    props.hslBase = new Vector3(
      hslObject.h,
      hslObject.s * healthOffset * 0.8,
      hslObject.l * healthOffset
    );
    c.setHSL(props.hslBase.x, props.hslBase.y, props.hslBase.z);
    props.color = c.getHex();
    // props.leafColor = c.getHex();
  }

  props.openness = health * 0.1;

  return props;
};

export default HealthModifier;
