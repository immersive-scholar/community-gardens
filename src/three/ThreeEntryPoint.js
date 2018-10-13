import RandomSeed from "random-seed";
import HighresExport from "three/vendor/Highres";
import SceneManager from "./SceneManager";
import GeneralCanvas from "./GeneralCanvas";

export default container => {
  const seed = Math.random();
  // const seed = 0.42415009388616753;
  const R = RandomSeed.create(seed);
  console.log("Random seed: ", seed);

  // State
  const state = {
    paused: false,
    pausedRenderer: false
  };

  const generalCanvas = new GeneralCanvas(document, container);
  const sceneManager = new SceneManager({ generalCanvas, R });

  createExporter(
    sceneManager.renderer,
    sceneManager.scene,
    sceneManager.camera
  );

  function bindEventListeners() {
    window.onresize = sceneManager.onWindowResize;
  }

  sceneManager.onWindowResize();
  render();
  bindEventListeners();

  function createExporter(renderer, scene, camera) {
    // Highres setup
    var options = {
      onStart: () => {
        state.paused = true;
      },
      onBeforeRender: () => {
        state.pausedRenderer = true;
      },
      onAfterRender: () => {
        state.pausedRenderer = false;
      },
      onExit: () => {
        state.paused = false;
      }
    };

    var highresExport = new HighresExport(renderer, scene, camera, options);
    highresExport.enable();
  }

  function render() {
    requestAnimationFrame(render);

    if (!state.paused) {
      sceneManager.update();
    }

    // if (!state.pausedRenderer) {
    //     renderer.render(scene, camera)
    // }
  }
};