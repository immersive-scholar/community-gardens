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
    count = 6,
    solomonsSealInstances = [];

  solomonsSealGroup.position.y = 0;

  for (let x = 0, i = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      solomonsSeal = new SolomonsSeal(
        {
          delay: i * 0.05,
          leafCount: R.intBetween(24, 48),
          windForce: R.floatBetween(0, 0.5),
          windDirection: new Vector3(
            R.floatBetween(-0.5, 0.5),
            0,
            R.floatBetween(-0.5, 0.5)
          ),
          hslBase: new Vector3(
            1,
            R.floatBetween(0, 0.5),
            R.floatBetween(0, 0.5)
          ),
          hslRange: new Vector3(
            R.floatBetween(0, 0.2),
            R.floatBetween(0.2, 0.4),
            R.floatBetween(0.2, 0.5)
          )
          // berryDisplacement: new Vector2(
          //   R.floatBetween(-0.4, 0.4),
          //   R.floatBetween(-0.4, 0.4)
          // )
          // offset: new Vector3(x * 0.02, (x + y) * 0.02, y * 0.02)
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
