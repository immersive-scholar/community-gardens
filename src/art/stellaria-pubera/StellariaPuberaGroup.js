import { Group, Vector3 } from "three-full";

import StellariaPubera from "art/stellaria-pubera/StellariaPubera";
// import SolomonsSealController from "art/solomons-seal/SolomonsSealController";
import GridLayoutHelper from "util/GridLayoutHelper";

const StellariaPuberaGroup = ({ R, camera, controls }) => {
  let stellariaPubera,
    stellariaPuberaGroup = new Group(),
    count = 1,
    instances = [];

  for (let x = 0, i = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      stellariaPubera = new StellariaPubera(
        {
          delay: i * 0.05,
          petalCount: 36, //R.intBetween(24, 48),
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
            R.floatBetween(0, 0.05),
            R.floatBetween(0.1, 0.2),
            R.floatBetween(0.1, 0.2)
          ),
          pollenCount: R.intBetween(24, 96),
          pollenDistanceFromStem: R.floatBetween(0.015, 0.2)
        },
        camera,
        R
      );
      stellariaPuberaGroup.add(stellariaPubera.group);
      instances.push(stellariaPubera);
      i++;
    }
  }

  GridLayoutHelper({
    group: stellariaPuberaGroup,
    rows: count,
    columns: count,
    rowWidth: 0.5,
    columnHeight: 0.5
  });
  console.log("stellariaPuberaGroup.position ", stellariaPuberaGroup.position);

  // const stellariaPuberaController = new StellariaPuberaController({ controls });
  // stellariaPuberaController.setInstance(stellariaPuberaInstances[0]);
  // stellariaPuberaController.enable();

  return { group: stellariaPuberaGroup };
};

export default StellariaPuberaGroup;
