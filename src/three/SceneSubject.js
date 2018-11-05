import kebabCase from "lodash/kebabCase";

import DidNotEatForADayChapter from "chapters/DidNotEatForADayChapter";
import FirstGenerationChapter from "chapters/FirstGenerationChapter";
import HighGPAChapter from "chapters/HighGPAChapter";
import HousingInsecurityChapter from "chapters/HousingInsecurityChapter";
import OutOfStateChapter from "chapters/OutOfStateChapter";
import PellGrantChapter from "chapters/PellGrantChapter";
import RandomGardenChapter from "chapters/RandomGardenChapter";
import ResourcedChapter from "chapters/ResourcedChapter";
import SummerGardenChapter from "chapters/SummerGardenChapter";
import WellnessChapter from "chapters/WellnessChapter";
import WinterGardenChapter from "chapters/WinterGardenChapter";

import ChapterPlate from "art/chapter-plate/ChapterPlate";
import * as STATS from "constants/Stats";

class SceneSubject {
  constructor({ scene, camera, R, controls, settings }) {
    this.scene = scene;
    this.camera = camera;
    this.R = R;
    this.controls = controls;
    this.settings = { ...settings };
    this.chaptersPlayed = 0;

    this.chapters = [
      DidNotEatForADayChapter,
      FirstGenerationChapter,
      HighGPAChapter,
      HousingInsecurityChapter,
      OutOfStateChapter,
      PellGrantChapter,
      RandomGardenChapter,
      ResourcedChapter,
      SummerGardenChapter,
      WellnessChapter,
      WinterGardenChapter
    ];

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

  sampleChapter() {
    const length = this.chapters.length;
    const chapterIndex = this.R.intBetween(0, length - 1);

    if (this.currentChapterIndex === chapterIndex) {
      return this.sampleChapter();
    }

    const chapterClass = this.chapters[chapterIndex];
    let chapter;

    switch (chapterClass) {
      case HousingInsecurityChapter:
        chapter = this.createHousingInsecurityChapter();
        break;
      case DidNotEatForADayChapter:
        chapter = this.createDidNotEatForADayChapter();
        break;
      case RandomGardenChapter:
        chapter = this.createRandomChapter();
        break;
      case PellGrantChapter:
        chapter = this.createPellGrantChapter();
        break;
      case HighGPAChapter:
        chapter = this.createHighGPAChapter();
        break;
      case OutOfStateChapter:
        chapter = this.createOutOfStateChapter();
        break;
      case FirstGenerationChapter:
        chapter = this.createFirstGenerationChapter();
        break;
      case ResourcedChapter:
        chapter = this.createResourcedChapter();
        break;
      case WellnessChapter:
        chapter = this.createWellnessChapter();
        break;
      case WinterGardenChapter:
        chapter = this.createWinterGardenChapter();
        break;
      case SummerGardenChapter:
      default:
        chapter = this.createSummerGardenChapter();
        break;
    }

    this.currentChapterIndex = chapterIndex;

    return chapter;
  }

  createScene(chapterID) {
    let chapter;
    switch (chapterID) {
      case "housing-insecurity":
        chapter = this.createHousingInsecurityChapter();
        break;
      case "did-not-eat-for-a-day":
        chapter = this.createDidNotEatForADayChapter();
        break;
      case "pell-grant":
        chapter = this.createPellGrantChapter();
        break;
      case "high-gpa":
        chapter = this.createHighGPAChapter();
        break;
      case "out-of-state":
        chapter = this.createOutOfStateChapter();
        break;
      case "first-generation":
        chapter = this.createFirstGenerationChapter();
        break;
      case "winter-garden":
        chapter = this.createWinterGardenChapter();
        break;
      case "wellness":
        chapter = this.createWellnessChapter();
        break;
      case "resourced":
        chapter = this.createResourcedChapter();
        break;
      case "summer-garden":
      default:
        chapter = this.createSummerGardenChapter();
        break;
    }

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

  createOutOfStateChapter() {
    const { settings, camera, controls, R } = this;
    const chapter = new OutOfStateChapter(
      { settings, focusTotal: 3 },
      camera,
      controls,
      R
    );
    return chapter;
  }

  createFirstGenerationChapter() {
    const { settings, camera, controls, R } = this;
    const chapter = new FirstGenerationChapter(
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

  createWellnessChapter() {
    const { settings, camera, controls, R } = this;
    const chapter = new WellnessChapter(
      { settings, focusTotal: 3 },
      camera,
      controls,
      R
    );
    return chapter;
  }

  createResourcedChapter() {
    const { settings, camera, controls, R } = this;
    const chapter = new ResourcedChapter(
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
    if (!chapter) return;
    this.scene.remove(chapter.group);
    chapter.clean();
    chapter = undefined;
  }

  playNextChapter() {
    this.chapterPlate.animateIn().then(() => {
      this.chaptersPlayed++;
      const chapter = this.sampleChapter();
      this.setCurrentChapter(chapter);
    });
  }

  setTimeMultiplier(t) {
    this.settings.timeMultiplier = t;
    this.currentChapter.setTimeMultiplier(t);
  }

  update() {}

  setQuantityMultiplier(quantityMultiplier) {
    this.settings.quantityMultiplier = quantityMultiplier;
  }
}

export default SceneSubject;
