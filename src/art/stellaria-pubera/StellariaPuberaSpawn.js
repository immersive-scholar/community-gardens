import { Group, Vector3, Box3 } from "three-full";

import StellariaPubera from "art/stellaria-pubera/StellariaPubera";
import StellariaPuberaController from "art/stellaria-pubera/StellariaPuberaController";
import GridLayoutHelper from "util/GridLayoutHelper";

const StellariaPuberaSpawn = ({ R, camera, controls }) => {
  let stellariaPubera,
    stellariaPuberaGroup = new Group(),
    count = 1,
    instances = [];

  stellariaPuberaGroup.rotation.x = -Math.PI / 2;

  createNewStellariaPubera({ count });
  setInterval(() => cleanInstances(), 500);

  function createNewStellariaPubera({ count }) {
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
            berrySpiralDepth: R.floatBetween(0, 0.1)
          },
          camera,
          R
        );
        stellariaPuberaGroup.position.x = -0.25;
        stellariaPuberaGroup.position.y = 0.25;
        stellariaPuberaGroup.rotation.z = -Math.PI / 2;
        stellariaPuberaGroup.add(stellariaPubera.group);
        instances.push(stellariaPubera);
        i++;
      }
    }
  }

  //   GridLayoutHelper({
  //     group: stellariaPuberaGroup,
  //     rows: count,
  //     columns: count,
  //     rowWidth: 0.5,
  //     columnHeight: 0.5
  //   });

  const stellariaPuberaController = new StellariaPuberaController({
    controls,
    instance: instances[0]
  });

  function cleanInstances() {
    for (
      let i = 0,
        instance,
        coordinates = new Vector3(),
        boundingBox = new Box3();
      i < instances.length;
      i++
    ) {
      instance = instances[i];
      boundingBox = new Box3().setFromObject(instance.group);
      coordinates.copy(boundingBox.max).sub(camera.position);
      if (coordinates.z < -0.1) {
        removeInstance(instance, i);
      }
    }
  }

  function removeInstance(instance, i) {
    if (instance) {
      instance.clean();
      stellariaPuberaGroup.remove(instance.group);
      instances.splice(i, 1);
      instance = undefined;
    }
  }

  return { group: stellariaPuberaGroup };
};

export default StellariaPuberaSpawn;
