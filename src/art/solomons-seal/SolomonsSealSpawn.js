import { Group, Vector3, Box3 } from "three-full";
import sample from "lodash/sample";

import SolomonsSeal from "art/solomons-seal/SolomonsSeal";
import SolomonsSealController from "art/solomons-seal/SolomonsSealController";
import GridLayoutHelper from "util/GridLayoutHelper";

const SolomonsSealSpawn = ({ R, camera, controls }) => {
  let solomonsSeal,
    intervalID,
    solomonsSealGroup = new Group(),
    count = 10,
    instances = [];

  createSolomonsSeal({ count });
  //   intervalID = setInterval(() => cleanInstances(), 500);

  function createSolomonsSeal({ count }) {
    for (let x = 0, i = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        solomonsSeal = new SolomonsSeal(
          {
            lazy: true,
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

    const rowWidth = 0.1,
      columnHeight = 0.1;

    // arrange layout
    GridLayoutHelper({
      group: solomonsSealGroup,
      rows: count,
      columns: count,
      rowWidth,
      columnHeight,
      layoutAxis: GridLayoutHelper.LAYOUT_FLOOR
    });

    for (let i = 0, iL = instances.length; i < iL; i++) {
      instances[i].createChildren();
      instances[i].animateIn({ delay: i * 0.5 });
    }
  }

  const solomonsSealController = new SolomonsSealController({
    controls,
    instance: instances[0]
  });

  function clean() {
    intervalID && clearInterval(intervalID);
  }

  function cleanInstances() {
    const removeMe = [];
    const cameraPosition = new Vector3().setFromMatrixPosition(
      camera.matrixWorld
    );
    const lookAt = new Vector3();
    camera.getWorldDirection(lookAt);

    for (
      let i = 0, instance, coordinates = new Vector3(), behind = false;
      i < instances.length;
      i++
    ) {
      instance = instances[i];
      coordinates.setFromMatrixPosition(instance.group.matrixWorld);
      coordinates.sub(cameraPosition);
      behind = coordinates.angleTo(lookAt) > Math.PI / 2;
      if (behind) {
        removeMe.push({ instance, index: i });
      }
    }

    for (let i = removeMe.length - 1, data; i >= 0; i--) {
      data = removeMe[i];
      removeInstance(data.instance, data.index);
    }
  }

  function removeInstance(instance, index) {
    console.log("Removing: ", instance, index);
    instance.clean();
    solomonsSealGroup.remove(instance.group);
    instances.splice(index, 1);
    instance = undefined;
  }

  function getRandomInstance() {
    return sample(instances);
  }

  return {
    group: solomonsSealGroup,
    createSolomonsSeal,
    getRandomInstance
  };
};

export default SolomonsSealSpawn;
