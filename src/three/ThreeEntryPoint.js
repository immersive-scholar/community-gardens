import RandomSeed from "random-seed";
import HighresExport from "three/vendor/Highres";
import { TweenMax } from "gsap";
import SceneManager from "./SceneManager";
import GeneralCanvas from "./GeneralCanvas";
import DataFactory from "util/DataFactory";
import ColorFactory from "util/ColorFactory";
import TextureFactory from "util/TextureFactory";
import Settings from "util/Settings";
import InsecurityCalculator from "data/InsecurityCalculator";

export default (container, settings) => {
  console.log("settings ", settings);
  TweenMax.globalTimeScale(settings.timeMultiplier);

  new Settings();

  const seed = Math.random();
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
      ColorFactory.debug();
    })
    .then(() => {
      InsecurityCalculator.parse(DataFactory.data);
    })
    .then(() => {
      sceneManager.subject.createScene();
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

  function setSettings(settings) {
    console.log(this);
    console.log("got settings ", settings);
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
