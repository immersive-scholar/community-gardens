import { Group, Vector3 } from "three-full";

import SolomonsSeal from "art/solomons-seal/SolomonsSeal";
import SolomonsSealController from "art/solomons-seal/SolomonsSealController";
import GridLayoutHelper from "util/GridLayoutHelper";

const SolomonsSealGroup = ({ R, camera, controls }) => {
  let solomonsSeal,
    solomonsSealGroup = new Group(),
    count = 1,
    instances = [];

  solomonsSealGroup.position.y = 0;

  for (let x = 0, i = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      solomonsSeal = new SolomonsSeal(
        {
          delay: i * 0.05,
          leafCount: R.intBetween(12, 24),
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
          ),
          berryCount: R.intBetween(24, 96),
          berryDistanceFromStem: R.floatBetween(0.015, 0.2)
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
      instances.push(solomonsSeal);
      i++;
    }
  }

  GridLayoutHelper({
    group: solomonsSealGroup,
    rows: count,
    columns: count,
    rowWidth: 0.1,
    columnHeight: 0.1
  });

  const solomonsSealController = new SolomonsSealController({ controls });
  solomonsSealController.setInstance(instances[0]);

  return { group: solomonsSealGroup, instances };
};

export default SolomonsSealGroup;
