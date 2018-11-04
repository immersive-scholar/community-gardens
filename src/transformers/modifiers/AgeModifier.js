const AgeModifier = ({ props, age }) => {
  if (age > 18) {
    props.petalCount = age;
    props.leafCount = age;
  }

  return props;
};

export default AgeModifier;
