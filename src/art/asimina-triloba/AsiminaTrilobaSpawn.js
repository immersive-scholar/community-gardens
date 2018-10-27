import { Group, Vector3 } from "three-full";
import sample from "lodash/sample";

import AsiminaTriloba from "art/asimina-triloba/AsiminaTriloba";
import AsiminaTrilobaController from "art/asimina-triloba/AsiminaTrilobaController";
import GridLayoutHelper from "util/GridLayoutHelper";

const AsiminaTrilobaSpawn = ({ R, camera, controls, delay = 0 }) => {
  let asiminaTriloba,
    intervalID,
    asiminaTrilobaGroup = new Group(),
    count = 1,
    instances = [];

  createAsiminaTriloba({ count });
  //   const intervalID = setInterval(() => cleanInstances(), 500);

  function createAsiminaTriloba({ count }) {
    for (let x = 0, i = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        asiminaTriloba = new AsiminaTriloba(
          {
            delay: delay + i * 0.25,
            petalCount: R.intBetween(6, 12),
            windForce: R.floatBetween(0, 0.1),
            windDirection: new Vector3(
              R.floatBetween(0, 0.3),
              R.floatBetween(0, 0.3),
              R.floatBetween(0, 0.3)
            ),
            openness: R.floatBetween(0, 0.1)
            // hslBase: new Vector3(
            //   1,
            //   R.floatBetween(0, 0.5),
            //   R.floatBetween(0, 0.5)
            // ),
            // hslRange: new Vector3(
            //   R.floatBetween(0, 0.05),
            //   R.floatBetween(0.1, 0.25),
            //   R.floatBetween(0.1, 0.25)
            // ),
            // petalTarget: new Vector3(0, 10, -10),
            // berryDistanceFromStem: R.floatBetween(0.01, 0.08),
          },
          camera,
          R
        );
        asiminaTrilobaGroup.add(asiminaTriloba.group);
        instances.push(asiminaTriloba);
        i++;
      }
    }

    const rowWidth = 0.5,
      columnHeight = 0.5;

    // arrange layout
    GridLayoutHelper({
      group: asiminaTrilobaGroup,
      rows: count,
      columns: count,
      rowWidth,
      columnHeight,
      layoutAxis: GridLayoutHelper.LAYOUT_WALL
    });

    asiminaTrilobaGroup.position.y = 0.25;

    for (let i = 0, iL = instances.length; i < iL; i++) {
      instances[i].createChildren();
      instances[i].animateIn({ delay: i * 0.5 });
    }
  }

  new AsiminaTrilobaController({
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
    asiminaTrilobaGroup.remove(instance.group);
    instances.splice(index, 1);
    instance = undefined;
  }

  function getRandomInstance() {
    return sample(instances);
  }

  return {
    group: asiminaTrilobaGroup,
    createAsiminaTriloba,
    getRandomInstance,
    clean,
    cleanInstances
  };
};

export default AsiminaTrilobaSpawn;
