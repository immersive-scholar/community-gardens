import { Clock } from "three-full";
import Stats from "stats.js";

import SceneSubject from "./SceneSubject";
import GeneralScene from "./GeneralScene";
import GeneralRenderer from "./GeneralRenderer";
import PostProcessing from "./PostProcessing";
import GeneralCamera from "./GeneralCamera";
import GeneralControls from "./GeneralControls";
import GeneralLights from "./GeneralLights";
import CameraController from "./helpers/CameraController";

export default ({ generalCanvas, R, settings }) => {
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
  // const postProcessing = new PostProcessing({ scene, camera, renderer });

  const cameraGUI = new CameraController({ camera, controls, settings });
  cameraGUI.enable();

  // controls.animateChapter2();
  // controls.controls.autoRotate = true;

  new GeneralLights({ scene, controls });
  // const lights = new GeneralLights({ scene, controls });
  // lights.createControls();

  const subject = new SceneSubject({ scene, camera, R, controls, settings });

  function update() {
    stats.begin();

    const elapsedTime = clock.getElapsedTime();

    controls.update();

    camera.updateProjectionMatrix();

    subject.update(elapsedTime);
    renderer.render(scene, camera);
    // postProcessing.composer.render(0.1);

    stats.end();
  }

  function onWindowResize() {
    generalCanvas.resizeCanvas();

    const width = window.innerWidth,
      height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    // postProcessing.composer.setSize(width, height);
  }

  return {
    update,
    onWindowResize,
    renderer,
    scene,
    camera,
    subject
  };
};
