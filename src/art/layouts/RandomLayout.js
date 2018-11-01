import { Vector3 } from "three-full";

const RandomLayout = ({
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
      z;
    i < iL;
    i++
  ) {
    mesh = instances[i];
    x = R.random();
    y = R.random();
    z = R.random();
    randomPosition
      .set(x, y, z)
      .multiply(bounds)
      .add(position.clone());
    mesh.group.position.copy(randomPosition);
  }
};

export default RandomLayout;
