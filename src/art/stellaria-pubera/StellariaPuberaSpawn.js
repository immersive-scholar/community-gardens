import { Group, Vector3 } from "three-full";
import sample from "lodash/sample";

import StellariaPubera from "art/stellaria-pubera/StellariaPubera";
import StellariaPuberaController from "art/stellaria-pubera/StellariaPuberaController";
import GridLayoutHelper from "util/GridLayoutHelper";

const StellariaPuberaSpawn = ({ R, camera, controls }) => {
  let stellariaPubera,
    intervalID,
    stellariaPuberaGroup = new Group(),
    count = 4,
    instances = [];

  createStellariaPubera({ count });
  //   const intervalID = setInterval(() => cleanInstances(), 500);

  function createStellariaPubera({ count }) {
    for (let x = 0, i = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        stellariaPubera = new StellariaPubera(
          {
            delay: i * 0.25,
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
            berryDistanceFromStem: R.floatBetween(0.01, 0.08),
            berrySpiralDepth: R.floatBetween(0.01, 0.15)
          },
          camera,
          R
        );
        stellariaPuberaGroup.add(stellariaPubera.group);
        instances.push(stellariaPubera);
        i++;
      }
    }

    const rowWidth = 0.5,
      columnHeight = 0.5;

    // arrange layout
    GridLayoutHelper({
      group: stellariaPuberaGroup,
      rows: count,
      columns: count,
      rowWidth,
      columnHeight,
      layoutAxis: GridLayoutHelper.LAYOUT_WALL
    });

    stellariaPuberaGroup.position.y = 0.25;

    for (let i = 0, iL = instances.length; i < iL; i++) {
      instances[i].createChildren();
      instances[i].animateIn({ delay: i * 0.5 });
    }
  }

  new StellariaPuberaController({
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
    stellariaPuberaGroup.remove(instance.group);
    instances.splice(index, 1);
    instance = undefined;
  }

  function getRandomInstance() {
    return sample(instances);
  }

  return {
    group: stellariaPuberaGroup,
    createStellariaPubera,
    getRandomInstance
  };
};

export default StellariaPuberaSpawn;
