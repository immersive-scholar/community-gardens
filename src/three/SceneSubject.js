import { Group, Vector3 } from "three-full";
import SolomonsSeal from "art/solomons-seal/SolomonsSeal";
import SolomonsSealController from "art/solomons-seal/SolomonsSealController";
import Plane from "art/plane/Plane";
import GridLayoutHelper from "util/GridLayoutHelper";

// import Garden from "art/garden/Garden";

const SceneSubject = ({ scene, camera, R, controls }) => {
  // const garden = new Garden({ R, camera });
  // scene.add(garden.mesh);

  let solomonsSeal,
    solomonsSealGroup = new Group(),
    count = 10,
    solomonsSealInstances = [];

  solomonsSealGroup.position.y = 0;

  for (let x = 0, i = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      solomonsSeal = new SolomonsSeal(
        {
          delay: i * 0.05,
          offset: new Vector3(x * 0.002, (x + y) * 0.002, y * 0.002)
        },
        camera,
        R
      );
      solomonsSealGroup.add(solomonsSeal.group);
      solomonsSealInstances.push(solomonsSeal);
      i++;
    }
  }

  const solomonsSealController = new SolomonsSealController({ controls });
  solomonsSealController.setInstance(solomonsSealInstances[0]);
  solomonsSealController.enable();

  GridLayoutHelper({
    group: solomonsSealGroup,
    rows: count,
    columns: count,
    rowWidth: 0.1,
    columnHeight: 0.1
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
