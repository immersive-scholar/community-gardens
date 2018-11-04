const OutOfStateModifier = ({ props, outOfState }) => {
  if (outOfState) {
    props.imagePath = `${process.env.PUBLIC_URL}/img/patterns/topography.png`;
  }

  return props;
};

export default OutOfStateModifier;
