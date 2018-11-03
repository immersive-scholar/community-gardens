const AgeModifier = ({ props, age }) => {
  props.petalCount = age;
  props.leafCount = age;

  return props;
};

export default AgeModifier;
