import { Clock } from "three-full";
import Stats from "stats.js";

import SceneSubject from "./SceneSubject";
import GeneralScene from "./GeneralScene";
import GeneralRenderer from "./GeneralRenderer";
import GeneralCamera from "./GeneralCamera";
import GeneralControls from "./GeneralControls";
import GeneralLights from "./GeneralLights";
// import PostProcessing from "./PostProcessing";
import CameraController from "./helpers/CameraController";

export default ({ generalCanvas, R, settings }) => {
  const { debug } = settings;
  let clock = new Clock();

  let stats = new Stats();
  if (debug) {
    document.body.appendChild(stats.dom);
  }

  const screenDimensions = generalCanvas.getDimensions();

  let scene = new GeneralScene({});
  let renderer = new GeneralRenderer({
    canvas: generalCanvas.canvas,
    width: screenDimensions.width,
    height: screenDimensions.height,
    dpr: settings.dpr,
    antiAlias: settings.antiAlias
  });
  let camera = new GeneralCamera(screenDimensions);
  let controls = new GeneralControls({
    domElement: generalCanvas.canvas,
    camera,
    velocity: settings.timeMultiplier
  });
  // const postProcessing = new PostProcessing({ scene, camera, renderer });

  let cameraGUI;
  if (settings.debug) {
    cameraGUI = new CameraController({ camera, controls, settings });
    cameraGUI.enable();
  }

  let lights = new GeneralLights({ scene, controls });
  // let lights = new GeneralLights({ scene, controls });
  // lights.createControls();

  let subject = new SceneSubject({ scene, camera, R, controls, settings });

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

  function setDebug(d) {
    const body = document.body;
    if (d) {
      body.appendChild(stats.dom);
    } else {
      if (body.contains(stats.dom)) {
        body.removeChild(stats.dom);
      }
    }
  }

  function clean() {
    // document.body.removeChild(stats.dom);
    subject.cleanChapter(subject.currentChapter);
    controls.enabled = false;

    clock = clock ? null : {};
    stats = stats ? null : {};
    renderer = renderer ? null : {};
    camera = camera ? null : {};
    controls = controls ? null : {};
    lights = lights ? null : {};
    subject = subject ? null : {};
    cameraGUI = cameraGUI ? null : {};
    scene = scene ? null : {};
  }

  return {
    update,
    onWindowResize,
    renderer,
    scene,
    camera,
    subject,
    setDebug,
    clean,
    controls
  };
};
