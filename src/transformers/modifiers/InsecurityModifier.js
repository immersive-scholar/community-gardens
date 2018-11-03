const InsecurityModifier = ({ props, foodInsecurity, housingInsecurity }) => {
  if (foodInsecurity || housingInsecurity) {
    props.lookUpAt = true;
  }

  return props;
};

export default InsecurityModifier;
