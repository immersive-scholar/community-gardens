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
  const camera = new GeneralCamera(screenDimensions);
  const controls = new GeneralControls({ camera });
  const lights = new GeneralLights({ scene, controls });
  const { renderer, DPR } = new GeneralRenderer({
    canvas: generalCanvas.canvas,
    width: screenDimensions.width,
    height: screenDimensions.height,
    scene,
    camera
  });
  // lights.createControls();
  const subject = new SceneSubject({ scene, camera, R, controls });

  function update() {
    stats.begin();

    const elapsedTime = clock.getElapsedTime();

    controls.update();

    camera.updateProjectionMatrix();

    subject.update(elapsedTime);
    renderer.render(scene, camera);
    // renderer.clear();
    // composer.render();

    stats.end();
  }

  function onWindowResize() {
    generalCanvas.resizeCanvas();

    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // composer.setSize(width * DPR, height * DPR);

    renderer.setSize(width, height);
  }

  return {
    update,
    onWindowResize,
    renderer,
    scene,
    camera
  };
};
