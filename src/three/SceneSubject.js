import { Group, Vector3 } from "three-full";
import Bender from "art/bender/Bender";
import BenderController from "art/bender/BenderController";

const SceneSubject = ({ scene, camera, R, controls }) => {
  const bender = new Bender({});
  scene.add(bender.group);

  const benderController = new BenderController({ controls });
  benderController.setInstance(bender);
  benderController.enable();

  function update() {}

  return {
    update
  };
};

export default SceneSubject;
