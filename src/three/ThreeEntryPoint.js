import RandomSeed from "random-seed";
import HighresExport from "three/vendor/Highres";
import SceneManager from "./SceneManager";
import GeneralCanvas from "./GeneralCanvas";
import DataFactory from "util/DataFactory";
import ColorFactory from "util/ColorFactory";
import TextureFactory from "util/TextureFactory";
import Settings from "util/Settings";

export default container => {
  const settings = new Settings();

  const seed = Math.random();
  // const seed = 0.42415009388616753;
  const R = RandomSeed.create(seed);
  console.log("Random seed: ", seed);

  ColorFactory.setSeed(seed);

  Promise.all([
    DataFactory.load("/json/data.json"),
    ColorFactory.load({
      summer: "/json/colors-raleigh-summer.json",
      fall: "/json/colors-raleigh-fall.json"
    }),
    TextureFactory.load("/json/textures.json")
  ]).then(result => {
    DataFactory.JSON_to_ZIP("/json/data.json", () =>
      console.log("DONE ZIPPING ", arguments)
    );
    sceneManager.subject.createScene();
  });

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
