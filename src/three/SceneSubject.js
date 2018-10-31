import RandomGardenChapter from "chapters/RandomGardenChapter";
import DidNotEatForADayChapter from "chapters/DidNotEatForADayChapter";

class SceneSubject {
  constructor({ scene, camera, R, controls, settings }) {
    this.scene = scene;
    this.camera = camera;
    this.R = R;
    this.controls = controls;
    this.settings = settings;
    this.chapterIndex = 0;
  }

  createScene() {
    this.createRandomChapter();
  }

  createRandomChapter() {
    const { settings, camera, controls, R, scene } = this;
    const chapter = new RandomGardenChapter(
      { settings, focusTotal: 1 },
      camera,
      controls,
      R
    );
    scene.add(chapter.group);
    chapter.init();
    chapter.animateIn().then(() => this.playNextChapter());

    this.currentChapter = chapter;
  }

  createDidNotEatForADayChapter() {
    console.log("createDidNotEatForADayChapter.");
    const { settings, camera, controls, R, scene } = this;
    const chapter = new DidNotEatForADayChapter(
      { settings, focusTotal: 1 },
      camera,
      controls,
      R
    );
    scene.add(chapter.group);
    chapter.init();
    chapter.animateIn().then(() => this.playNextChapter());

    this.currentChapter = chapter;
  }

  playNextChapter() {
    this.chapterIndex++;
    console.log("this.currentChapter ", this.currentChapter);
    console.log("this.chapterIndex ", this.chapterIndex);
    this.createDidNotEatForADayChapter();
  }

  update() {}
}

export default SceneSubject;
