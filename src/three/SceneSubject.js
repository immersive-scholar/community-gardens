// import { Group } from "three-full";
// import SolomonsSeal from "art/solomons-seal/SolomonsSeal";
// import Plane from "art/plane/Plane";
// import GridLayoutHelper from "util/GridLayoutHelper";
// import SolomonsSealLeaf from "../art/solomons-seal/SolomonsSealLeaf";

import Garden from "art/garden/Garden";

const SceneSubject = ({ scene, camera, R }) => {
  const garden = new Garden({});
  scene.add(garden.mesh);
  function update() {}
  return {
    garden,
    update
  };
};

export default SceneSubject;
