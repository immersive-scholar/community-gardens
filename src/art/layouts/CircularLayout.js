import { _Math, Vector3 } from "three-full";

const CircularLayout = ({
  instances = [],
  bounds = new Vector3(10, 10, 10),
  position = new Vector3(0, 0, 0),
  R
}) => {
  for (
    let i = 0,
      mesh,
      iL = instances.length,
      randomPosition = new Vector3(),
      x,
      y,
      z,
      ratio,
      angle;
    i < iL;
    i++
  ) {
    mesh = instances[i];
    ratio = i / iL;
    angle = _Math.degToRad(360 * ratio);
    x = Math.cos(angle);
    y = Math.sin(angle);
    z = Math.sin(angle);
    randomPosition
      .set(x, y, z)
      .multiply(bounds)
      .add(position.clone());
    mesh.group.position.copy(randomPosition);
  }
};

export default CircularLayout;
