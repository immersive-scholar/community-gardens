import { Group } from "three-full";
import SolomonsSeal from "art/solomons-seal/SolomonsSeal";
import Plane from "art/plane/Plane";
import GridLayoutHelper from "util/GridLayoutHelper";
import SolomonsSealLeaf from "../art/solomons-seal/SolomonsSealLeaf";

// import Garden from "art/garden/Garden";

const SceneSubject = ({ scene, camera, R }) => {
  // const garden = new Garden({ R, camera });
  // scene.add(garden.mesh);

  let solomonsSeal,
    solomonsSealGroup = new Group(),
    count = 4;

  solomonsSealGroup.position.y = 0;

  for (let x = 0, i = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      solomonsSeal = new SolomonsSeal({
        camera,
        R,
        delay: i * 0.05,
        rx: x * 0.5,
        ry: y * 0.5
      });
      solomonsSealGroup.add(solomonsSeal.group);
      i++;
    }
  }

  GridLayoutHelper({
    group: solomonsSealGroup,
    rows: count,
    columns: count,
    rowWidth: 0.25,
    columnHeight: 0.25
  });

  scene.add(solomonsSealGroup);

  const plane = new Plane();
  scene.add(plane.group);

  function update() {}

  return {
    update
  };
};

export default SceneSubject;
