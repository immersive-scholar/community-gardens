import { Vector2, Vector3, _Math, Group, Color } from "three-full";
import shuffle from "lodash/shuffle";

import BaseChapter from "./BaseChapter";
import BackgroundBAS from "art/background/BackgroundBAS";
import SolomonsSealSpawn from "art/solomons-seal/SolomonsSealSpawn";
import StellariaPuberaSpawn from "art/stellaria-pubera/StellariaPuberaSpawn";
import AsiminaTrilobaSpawn from "art/asimina-triloba/AsiminaTrilobaSpawn";
// import ChapterPlate from "art/chapter-plate/ChapterPlate";
import ChapterTitle from "art/chapter-plate/ChapterTitle";
import InsecurityCalculator from "data/InsecurityCalculator";
import TextureFactory from "util/TextureFactory";
import CircularLayout from "art/layouts/CircularLayout";
import { LAYOUT_FLOOR } from "art/layouts/LayoutConstants";
import { LOW_HEALTH } from "constants/Stats";

class XmasCardChapter extends BaseChapter {
  constructor(props = {}, camera, controls, R) {
    super(props, camera, controls, R);
  }

  init = () => {
    this.plantGroup = new Group();
    this.group.add(this.plantGroup);

    const stat = InsecurityCalculator.getStat(LOW_HEALTH);
    const { color, textArray } = stat;
    const bgColor = 0x14161f;

    const { show3DTitles } = this.settings;
    const count = 120;
    const solomonsSealCount = count * 0.8;
    const stellariaPuberaCount = count * 0.1;
    const asiminaTrilobaCount = count * 0.1;

    this.background = new BackgroundBAS({ color: bgColor });
    this.addCleanable(this.background);

    // this.chapterPlate = new ChapterPlate({
    //   camera: this.camera,
    //   color: bgColor
    // });
    // this.addCleanable(this.chapterPlate, this.chapterPlate.group);

    this.chapterTitle = new ChapterTitle({
      color,
      textArray
    });
    show3DTitles && this.chapterTitle.createChildren();
    this.addCleanable(this.chapterTitle, this.chapterTitle.group);

    let bounds = new Vector3(1, 1, 1),
      position = new Vector3();

    let data = InsecurityCalculator.getRandomRows({
      R: this.R,
      count,
      key: LOW_HEALTH
    });

    // Solomon's Seal
    this.solomonsSealSpawn = new SolomonsSealSpawn({
      instanceDelay: 0,
      data: data,
      dataOffset: this.instances.length,
      count: solomonsSealCount,
      R: this.R,
      camera: this.camera,
      controls: this.controls
    });
    this.plantGroup.add(this.solomonsSealSpawn.group);
    this.addInstances(this.solomonsSealSpawn.instances);
    this.spawns.push(this.solomonsSealSpawn);

    // Stellaria Pubera
    this.stellariaPuberaSpawn = new StellariaPuberaSpawn({
      instanceDelay: 0,
      data: data,
      dataOffset: this.instances.length,
      count: stellariaPuberaCount,
      R: this.R,
      camera: this.camera,
      controls: this.controls
    });
    this.plantGroup.add(this.stellariaPuberaSpawn.group);
    this.addInstances(this.stellariaPuberaSpawn.instances);
    this.spawns.push(this.stellariaPuberaSpawn);

    // Asimina Triloba

    this.asiminaTrilobaSpawn = new AsiminaTrilobaSpawn({
      instanceDelay: 0,
      data: data,
      dataOffset: this.instances.length,
      count: asiminaTrilobaCount,
      R: this.R,
      camera: this.camera,
      controls: this.controls
    });
    this.plantGroup.add(this.asiminaTrilobaSpawn.group);
    this.addInstances(this.asiminaTrilobaSpawn.instances);
    this.spawns.push(this.asiminaTrilobaSpawn);

    this.instances = shuffle(this.instances);

    for (
      let i = 0, j = this.asiminaTrilobaSpawn.instances.length, instance;
      i < j;
      i++
    ) {
      instance = this.asiminaTrilobaSpawn.instances[i];
      instance.setPetalWidth(this.R.floatBetween(0.05, 0.2));
      instance.setPetalLength(this.R.floatBetween(0.1, 0.3));
    }
    for (
      let i = 0, j = this.stellariaPuberaSpawn.instances.length, instance;
      i < j;
      i++
    ) {
      instance = this.stellariaPuberaSpawn.instances[i];
      instance.setPetalWidth(this.R.floatBetween(0.05, 0.2));
      instance.setPetalLength(this.R.floatBetween(0.1, 0.3));
    }

    for (let i = 0, j = this.instances.length, instance; i < j; i++) {
      instance = this.instances[i];
      //   instance.setHeight(this.R.floatBetween(0.1, 1));
      instance.group.rotation.z = _Math.degToRad((i / j) * 360);
      instance.setSizeStart(
        new Vector2(
          this.R.floatBetween(0.05, 0.1),
          this.R.floatBetween(0.02, 0.04)
        )
      );
      instance.setSizeEnd(
        new Vector2(
          this.R.floatBetween(0.2, 0.6),
          this.R.floatBetween(0.1, 0.3)
        )
      );

      instance.setFogDensity(0);
      instance.setFogColor(new Color(0xffffff));
      //   instance.setColor(0xffffff);
      //   instance.setHSLBase(new Vector3(1, 1, 1));
      instance.setHSLRange(new Vector3(0, 0, 0.1));
      instance.setImagePath(TextureFactory.getStroke());
    }

    // layout
    bounds.set(1, 1, 0);
    position.set(0, 1, 0);
    new CircularLayout({
      layoutType: LAYOUT_FLOOR,
      instances: this.instances,
      group: this.plantGroup,
      R: this.R,
      bounds,
      position
    });

    this.camera.position.z = -3;
  };

  animateIn = ({ delay = 0 } = {}) => {
    return new Promise((resolve, reject) => {
      // We need to resolve the animateIn once a bunch of animations have run
      // so we're storing these for later retrieval.
      this.resolve = resolve;
      this.reject = reject;

      this.chapterTitle.animateIn();
      this.chapterTitle.animateOut({ delay: 15, duration: 10 });

      if (this.background) {
        this.background.time = 1;
        this.background.update();
      }

      if (this.ground) {
        this.ground.time = 1;
        this.ground.cliff = 0.5;
        this.ground.update();
      }

      for (let i = 0, j = this.instances.length, instance; i < j; i++) {
        instance = this.instances[i];
        instance.setDelay((i / j) * 10);

        instance.createChildren();
        instance.animateIn(instance.state);
      }
    });
  };
}

export default XmasCardChapter;
