import { Color, Vector3 } from "three-full";

const BelowPovertyLineModifier = ({ props, belowPovertyLine }) => {
  // dark colors if below poverty line
  let hslBase = {};
  if (belowPovertyLine) {
    new Color(props.color).getHSL(hslBase);
    props.hslBase = new Vector3(hslBase.h, 0.1, 0.2);
  }

  return props;
};

export default BelowPovertyLineModifier;
