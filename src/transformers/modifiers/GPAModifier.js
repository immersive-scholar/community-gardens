const GPAModifier = ({ props, gpa }) => {
  if (gpa >= 3) {
    // const c = 0xffffff;
    // // props.color = 0xfbd58e;
    // // props.color = 0xffffff;
    // props.leafColor = c;
    // props.petalColor = c;
    // const color = new Color(c);
    // let hsl = {};
    // color.getHSL(hsl);
    // props.hslBase = new Vector3(hsl.h, hsl.s, hsl.l);
    // props.hslRange = new Vector3(0, 0.1, 0.2);
    props.imagePath = `${process.env.PUBLIC_URL}/img/patterns/stars.png`;
  }

  return props;
};

export default GPAModifier;
