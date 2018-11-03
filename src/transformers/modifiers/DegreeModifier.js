const DegreeModifier = ({ props, degree, R }) => {
  switch (true) {
    case degree === 3:
      props.height = R.floatBetween(1, 2);
      break;
    case degree === 2:
      props.height = R.floatBetween(0.5, 1.5);
      break;
    case degree === 1:
    default:
      props.height = R.floatBetween(0.25, 1);
      break;
  }

  return props;
};

export default DegreeModifier;
