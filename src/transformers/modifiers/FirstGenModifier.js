const FirstGenModifier = ({ props, firstGen }) => {
  if (firstGen) {
    props.imagePath = `${process.env.PUBLIC_URL}/img/patterns/maze.png`;
  }

  return props;
};

export default FirstGenModifier;
