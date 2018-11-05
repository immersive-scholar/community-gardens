import RandomSeed from "random-seed";
import get from "lodash/get";
import HighresExport from "three/vendor/Highres";
import SceneManager from "./SceneManager";
import GeneralCanvas from "./GeneralCanvas";
import DataFactory from "util/DataFactory";
import ColorFactory from "util/ColorFactory";
import TextureFactory from "util/TextureFactory";
import InsecurityCalculator from "data/InsecurityCalculator";

export default (container, settings) => {
  console.log("settings ", settings);

  const { seed } = settings;

  // const seed = Math.random();
  // const seed = 0.4865584781852079;
  const R = RandomSeed.create(seed);
  console.log("Random seed: ", seed);

  ColorFactory.setSeed(seed);

  Promise.all([
    DataFactory.load(
      `${process.env.PUBLIC_URL}/json/data.json.zip`,
      "data.json"
    ),
    ColorFactory.load({
      summer: `${process.env.PUBLIC_URL}/json/colors-raleigh-summer.json`,
      fall: `${process.env.PUBLIC_URL}/json/colors-raleigh-fall.json`,
      winter: `${process.env.PUBLIC_URL}/json/colors-raleigh-winter.json`
    }),
    TextureFactory.load(`${process.env.PUBLIC_URL}/json/textures.json`)
  ])
    .then(() => {
      settings.debug && ColorFactory.debug();
    })
    .then(() => {
      InsecurityCalculator.parse(DataFactory.data);
    })
    .then(() => {
      const { quantityMultiplier } = settings;
      sceneManager.subject.setQuantityMultiplier(quantityMultiplier);

      const chapterID = get(settings, "match.params.gardenID", "");
      sceneManager.subject.createScene(chapterID);
    });

  // State
  const state = {
    paused: false,
    pausedRenderer: false
  };

  const generalCanvas = new GeneralCanvas(document, container);
  const sceneManager = new SceneManager({ generalCanvas, R, settings });

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

  // when redux dispatches a settings change event,
  // this function is summoned with the new settings object
  function setSettings(settings) {
    const { quantityMultiplier, timeMultiplier, debug } = settings;
    sceneManager.subject.setQuantityMultiplier(quantityMultiplier);
    sceneManager.subject.setTimeMultiplier(timeMultiplier);
    sceneManager.controls.setTimeMultiplier(timeMultiplier);

    sceneManager.setDebug(debug);
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

  return {
    setSettings
  };
};
