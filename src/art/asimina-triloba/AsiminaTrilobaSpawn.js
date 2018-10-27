import { Group, Vector3 } from "three-full";
import sample from "lodash/sample";

import AsiminaTriloba from "art/asimina-triloba/AsiminaTriloba";
import AsiminaTrilobaController from "art/asimina-triloba/AsiminaTrilobaController";
import GridLayoutHelper from "util/GridLayoutHelper";

const AsiminaTrilobaSpawn = ({ R, camera, controls }) => {
  let asiminaTriloba,
    intervalID,
    asiminaTrilobaGroup = new Group(),
    count = 10,
    instances = [];

  createAsiminaTriloba({ count });
  //   const intervalID = setInterval(() => cleanInstances(), 500);

  function createAsiminaTriloba({ count }) {
    for (let x = 0, i = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        asiminaTriloba = new AsiminaTriloba(
          {
            delay: i * 0.25,
            petalCount: R.intBetween(6, 12)
            // windForce: R.floatBetween(-0.1, 0),
            // windDirection: new Vector3(
            //   R.floatBetween(-1.5, 1.5),
            //   R.floatBetween(-1.5, 1.5),
            //   R.floatBetween(-1.5, 1.5)
            // )
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
            // openness: R.floatBetween(0, 2),
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
      layoutAxis: GridLayoutHelper.LAYOUT_FLOOR
    });

    asiminaTrilobaGroup.position.y = 0.25;
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
      let i = 0,
        instance,
        coordinates = new Vector3(),
        // boundingBox = new Box3(),
        behind = false;
      i < instances.length;
      i++
    ) {
      instance = instances[i];
      //   boundingBox = new Box3().setFromObject(instance.group);
      //   coordinates.copy(boundingBox.max).sub(camera.position);
      //   if (coordinates.z < -0.1) {
      //     removeMe.push({ instance, index: i });
      //   }
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
