import DidNotEatForADayChapter from "chapters/DidNotEatForADayChapter";
import HighGPAChapter from "chapters/HighGPAChapter";
import HousingInsecurityChapter from "chapters/HousingInsecurityChapter";
import PellGrantChapter from "chapters/PellGrantChapter";
import RandomGardenChapter from "chapters/RandomGardenChapter";
import SummerGardenChapter from "chapters/SummerGardenChapter";
import WinterGardenChapter from "chapters/WinterGardenChapter";

import ChapterPlate from "art/chapter-plate/ChapterPlate";

class SceneSubject {
  constructor({ scene, camera, R, controls, settings }) {
    this.scene = scene;
    this.camera = camera;
    this.R = R;
    this.controls = controls;
    this.settings = { ...settings };
    this.chapterIndex = 0;

    this.createChapterPlate();
    this.chapterPlate.animateIn({ animated: false });
  }

  createChapterPlate() {
    this.chapterPlate = new ChapterPlate({
      camera: this.camera,
      color: 0xffffff
    });
    this.scene.add(this.chapterPlate.group);
  }

  createScene() {
    // const chapter = this.createHousingInsecurityChapter();
    // const chapter = this.createDidNotEatForADayChapter();
    // const chapter = this.createRandomChapter();
    // const chapter = this.createPellGrantChapter();
    const chapter = this.createHighGPAChapter();
    // const chapter = this.createSummerGardenChapter();
    // const chapter = this.createWinterGardenChapter();
    this.setCurrentChapter(chapter);
  }

  createRandomChapter() {
    const { settings, camera, controls, R } = this;
    const chapter = new RandomGardenChapter(
      { settings, focusTotal: 3 },
      camera,
      controls,
      R
    );
    return chapter;
  }

  createDidNotEatForADayChapter() {
    const { settings, camera, controls, R } = this;
    const chapter = new DidNotEatForADayChapter(
      { settings, focusTotal: 3 },
      camera,
      controls,
      R
    );
    return chapter;
  }

  createHousingInsecurityChapter() {
    const { settings, camera, controls, R } = this;
    const chapter = new HousingInsecurityChapter(
      { settings, focusTotal: 3 },
      camera,
      controls,
      R
    );
    return chapter;
  }

  createHighGPAChapter() {
    const { settings, camera, controls, R } = this;
    const chapter = new HighGPAChapter(
      { settings, focusTotal: 3 },
      camera,
      controls,
      R
    );
    return chapter;
  }

  createPellGrantChapter() {
    const { settings, camera, controls, R } = this;
    const chapter = new PellGrantChapter(
      { settings, focusTotal: 3 },
      camera,
      controls,
      R
    );
    return chapter;
  }

  createSummerGardenChapter() {
    const { settings, camera, controls, R } = this;
    const chapter = new SummerGardenChapter(
      { settings, focusTotal: 3 },
      camera,
      controls,
      R
    );
    return chapter;
  }

  createWinterGardenChapter() {
    const { settings, camera, controls, R } = this;
    const chapter = new WinterGardenChapter(
      { settings, focusTotal: 3 },
      camera,
      controls,
      R
    );
    return chapter;
  }

  setCurrentChapter(chapter) {
    this.currentChapter && this.cleanChapter(this.currentChapter);

    this.scene.add(chapter.group);
    chapter.init();
    chapter.animateIn().then(() => this.playNextChapter());

    this.currentChapter = chapter;

    this.chapterPlate.animateOut({ delay: 1 });
  }

  cleanChapter(chapter) {
    this.scene.remove(chapter.group);
    chapter.clean();
    chapter = undefined;
  }

  playNextChapter() {
    this.chapterPlate.animateIn().then(() => {
      this.chapterIndex++;
      const chapter = this.createDidNotEatForADayChapter();
      this.setCurrentChapter(chapter);
    });
  }

  setTimeMultiplier(t) {
    this.settings.timeMultiplier = t;
    this.currentChapter.setTimeMultiplier(t);
  }

  update() {}

  setQuantityMultiplier(quantityMultipler) {
    this.settings.quantityMultipler = quantityMultipler;
  }
}

export default SceneSubject;
