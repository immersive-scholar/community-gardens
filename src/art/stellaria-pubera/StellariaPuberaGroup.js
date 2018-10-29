import { Group, Vector3 } from "three-full";

import StellariaPubera from "art/stellaria-pubera/StellariaPubera";
import StellariaPuberaController from "art/stellaria-pubera/StellariaPuberaController";
import GridLayout from "art/layouts/GridLayout";

const StellariaPuberaGroup = ({ R, camera, controls }) => {
  let stellariaPubera,
    stellariaPuberaGroup = new Group(),
    count = 10,
    instances = [];

  stellariaPuberaGroup.rotation.x = -Math.PI / 2;
  for (let x = 0, i = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      stellariaPubera = new StellariaPubera(
        {
          delay: i * 0.5,
          petalCount: 10, //R.intBetween(24, 48),
          windForce: R.floatBetween(-0.3, 0),
          windDirection: new Vector3(
            R.floatBetween(-1.5, 1.5),
            R.floatBetween(-1.5, 1.5),
            R.floatBetween(-1.5, 1.5)
          ),
          hslBase: new Vector3(
            1,
            R.floatBetween(0, 0.5),
            R.floatBetween(0, 0.5)
          ),
          hslRange: new Vector3(
            R.floatBetween(0, 0.05),
            R.floatBetween(0.1, 0.25),
            R.floatBetween(0.1, 0.25)
          ),
          petalTarget: new Vector3(0, 10, -10),
          openness: R.floatBetween(0, 2),
          berryCount: R.intBetween(16, 32),
          berryDistanceFromStem: R.floatBetween(0.002, 0.08),
          berrySpiralDepth: R.floatBetween(0.01, 0.05)
        },
        camera,
        R
      );
      stellariaPubera.group.rotation.z = Math.PI / 2;
      stellariaPuberaGroup.add(stellariaPubera.group);
      instances.push(stellariaPubera);
      i++;
    }
  }

  GridLayout({
    group: stellariaPuberaGroup,
    rows: count,
    columns: count,
    rowWidth: 0.5,
    columnHeight: 0.5
  });

  // const stellariaPuberaController = new StellariaPuberaController({
  //   controls,
  //   instance: instances[0]
  // });

  return { group: stellariaPuberaGroup };
};

export default StellariaPuberaGroup;
