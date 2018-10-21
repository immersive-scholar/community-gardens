// import Garden from "art/garden/Garden";
import SolomonsSealGroup from "art/solomons-seal/SolomonsSealGroup";
// import StellariaPuberaGroup from "art/stellaria-pubera/StellariaPuberaGroup";
import StellariaPuberaSpawn from "art/stellaria-pubera/StellariaPuberaSpawn";
// import Sky from "art/sky/Sky";
import Plane from "art/plane/Plane";
import SummerGardenChapter from "chapters/SummerGardenChapter";

const SceneSubject = ({ scene, camera, R, controls }) => {
  function createScene() {
    // const garden = new Garden({ R, camera, controls });
    // scene.add(garden.mesh);

    const chapter1 = new SummerGardenChapter({}, camera, controls, R);
    chapter1.init();
    scene.add(chapter1.group);

    // const sky = new Sky({}, camera, R);
    // scene.add(sky.group);

    // const stellariaPuberaSpawn = new StellariaPuberaSpawn({
    //   R,
    //   camera,
    //   controls
    // });
    // scene.add(stellariaPuberaSpawn.group);

    // const solomonsSealGroup = new SolomonsSealGroup({ R, camera, controls });
    // scene.add(solomonsSealGroup.group);

    // const plane = new Plane();
    // scene.add(plane.group);
  }

  function update() {}

  return {
    update,
    createScene
  };
};

export default SceneSubject;
