const OutOfStateModifier = ({ props, firstGen }) => {
  if (firstGen) {
    props.imagePath = `${process.env.PUBLIC_URL}/img/patterns/topography.png`;
  }

  return props;
};

export default OutOfStateModifier;
