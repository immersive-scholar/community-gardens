const InsecurityModifier = ({ props, foodInsecurity, housingInsecurity }) => {
  if (foodInsecurity || housingInsecurity) {
    props.lookUpAt = true;
  }

  if (foodInsecurity) {
    props.berryWireframe = true;
  }

  return props;
};

export default InsecurityModifier;
