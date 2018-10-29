import { Vector3 } from "three-full";
import { LAYOUT_RANDOM } from "./LayoutConstants";

const RandomLayout = ({
  group,
  bounds = new Vector3(10, 10, 10),
  position = new Vector3(0, 0, 0),
  R
}) => {
  for (
    let i = 0,
      mesh,
      iL = group.children.length,
      randomPosition = new Vector3(),
      x,
      y,
      z;
    i < iL;
    i++
  ) {
    mesh = group.children[i];
    x = R.random();
    y = R.random();
    z = R.random();
    randomPosition.set(x, y, z).multiply(bounds);
    mesh.position.copy(randomPosition);
  }
  group.position.copy(position);
};

export default RandomLayout;
