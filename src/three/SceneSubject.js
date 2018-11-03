import RandomGardenChapter from "chapters/RandomGardenChapter";
import DidNotEatForADayChapter from "chapters/DidNotEatForADayChapter";
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
    const chapter = this.createDidNotEatForADayChapter();
    // const chapter = this.createRandomChapter();
    this.setCurrentChapter(chapter);
  }

  createRandomChapter() {
    const { settings, camera, controls, R } = this;
    const chapter = new RandomGardenChapter(
      { settings, focusTotal: 1 },
      camera,
      controls,
      R
    );
    return chapter;
  }

  createDidNotEatForADayChapter() {
    const { settings, camera, controls, R } = this;
    const chapter = new DidNotEatForADayChapter(
      { settings, focusTotal: 1 },
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

  update() {}

  setQuantityMultiplier(quantityMultipler) {
    this.settings.quantityMultipler = quantityMultipler;
  }
}

export default SceneSubject;
