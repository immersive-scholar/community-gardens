import { Clock } from "three-full";
import Stats from "stats.js";

import SceneSubject from "./SceneSubject";
import GeneralScene from "./GeneralScene";
import GeneralRenderer from "./GeneralRenderer";
import GeneralCamera from "./GeneralCamera";
import GeneralControls from "./GeneralControls";
import GeneralLights from "./GeneralLights";

export default ({ generalCanvas, R }) => {
  const clock = new Clock();

  const stats = new Stats();
  document.body.appendChild(stats.dom);

  const screenDimensions = generalCanvas.getDimensions();

  const scene = new GeneralScene({});
  const renderer = new GeneralRenderer({
    canvas: generalCanvas.canvas,
    width: screenDimensions.width,
    height: screenDimensions.height
  });
  const camera = new GeneralCamera(screenDimensions);
  const controls = new GeneralControls({ camera });
  controls.animateChapter({});
  new GeneralLights({ scene, controls });
  // const lights = new GeneralLights({ scene, controls });
  // lights.createControls();
  const subject = new SceneSubject({ scene, camera, R, controls });

  function update() {
    stats.begin();

    const elapsedTime = clock.getElapsedTime();

    controls.update();

    camera.updateProjectionMatrix();

    subject.update(elapsedTime);
    renderer.render(scene, camera);

    stats.end();
  }

  function onWindowResize() {
    generalCanvas.resizeCanvas();

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  return {
    update,
    onWindowResize,
    renderer,
    scene,
    camera
  };
};
