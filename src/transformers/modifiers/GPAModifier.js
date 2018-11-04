import { Vector3, Color } from "three-full";

const GPAModifier = ({ props, gpa }) => {
  if (gpa >= 3) {
    // props.color = 0xfbd58e;
    props.color = 0xffffff;
    props.leafColor = 0xffffff;
    const color = new Color(props.color);
    let hsl = {};
    color.getHSL(hsl);
    props.hslBase = new Vector3(hsl.h, hsl.s, hsl.l);
    props.hslRange = new Vector3(0, 0.1, 0.2);
  }

  return props;
};

export default GPAModifier;
