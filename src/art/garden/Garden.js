import { Group, BoxGeometry } from "three";
import { MeshPhongMaterial } from "three-full";

import Circle from "art/circle/Circle";

const Garden = ({ size = 1, R, camera }) => {
  const group = new Group();

  const circle = new Circle({ R, camera });
  group.add(circle.group);

  return {
    mesh: group
  };
};

export default Garden;
