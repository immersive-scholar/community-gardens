import { Vector2, Vector3, Group } from "three-full";
import shuffle from "lodash/shuffle";

import BaseChapter from "./BaseChapter";
import BackgroundBAS from "art/background/BackgroundBAS";
import Plane from "art/plane/Plane";
import SolomonsSealSpawn from "art/solomons-seal/SolomonsSealSpawn";
import ChapterTitle from "art/chapter-plate/ChapterTitle";
import InsecurityCalculator from "data/InsecurityCalculator";
import TextureFactory from "util/TextureFactory";
import GridLayout from "art/layouts/GridLayout";
import { LAYOUT_WALL } from "art/layouts/LayoutConstants";
import { COMMUNITY_GARDEN } from "constants/Stats";

class PetalPrintChapter extends BaseChapter {
  constructor(props = {}, camera, controls, R) {
    super(props, camera, controls, R);
  }

  init = () => {
    this.plantGroup = new Group();
    this.group.add(this.plantGroup);

    const stat = InsecurityCalculator.getStat(COMMUNITY_GARDEN);
    const { color, textArray } = stat;
    // const bgColor = ColorFactory.getRandomColor();
    const bgColor = 0xffffff;

    const { show3DTitles } = this.settings;
    const count = 100;
    const plantTypes = 1;
    const solomonsSealCount = count / plantTypes;
    // const stellariaPuberaCount = count / plantTypes;
    // const asiminaTrilobaCount = count / plantTypes;

    this.background = new BackgroundBAS({ color: bgColor });
    this.addCleanable(this.background);

    this.plane = new Plane({ color: 0xdedede });
    this.plane.group.rotation.x = -Math.PI / 2;
    this.plane.group.position.z = 2;
    this.group.add(this.plane.group);

    // this.ground = new GroundBAS({
    //   color: bgColor,
    //   R: this.R
    // });
    // this.addCleanable(this.ground);

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
      key: COMMUNITY_GARDEN
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
    // this.stellariaPuberaSpawn = new StellariaPuberaSpawn({
    //   instanceDelay: 0,
    //   data: data,
    //   dataOffset: this.instances.length,
    //   count: stellariaPuberaCount,
    //   R: this.R,
    //   camera: this.camera,
    //   controls: this.controls
    // });
    // this.plantGroup.add(this.stellariaPuberaSpawn.group);
    // this.addInstances(this.stellariaPuberaSpawn.instances);
    // this.spawns.push(this.stellariaPuberaSpawn);

    // Asimina Triloba
    // this.asiminaTrilobaSpawn = new AsiminaTrilobaSpawn({
    //   instanceDelay: 0,
    //   data: data,
    //   dataOffset: this.instances.length,
    //   count: asiminaTrilobaCount,
    //   R: this.R,
    //   camera: this.camera,
    //   controls: this.controls
    // });
    // this.plantGroup.add(this.asiminaTrilobaSpawn.group);
    // this.addInstances(this.asiminaTrilobaSpawn.instances);
    // this.spawns.push(this.asiminaTrilobaSpawn);

    this.instances = shuffle(this.instances);

    for (
      let i = 0, j = this.solomonsSealSpawn.instances.length, instance;
      i < j;
      i++
    ) {
      instance = this.solomonsSealSpawn.instances[i];
      instance.group.rotation.x = -Math.PI / 2;
    }

    // for (
    //   let i = 0, j = this.asiminaTrilobaSpawn.instances.length, instance;
    //   i < j;
    //   i++
    // ) {
    //   instance = this.asiminaTrilobaSpawn.instances[i];
    //   instance.setPetalWidth(this.R.floatBetween(0.05, 0.2));
    //   instance.setPetalLength(this.R.floatBetween(0.1, 0.3));
    //   instance.setStemEnabled(false);
    // }

    // for (
    //   let i = 0, j = this.stellariaPuberaSpawn.instances.length, instance;
    //   i < j;
    //   i++
    // ) {
    //   instance = this.stellariaPuberaSpawn.instances[i];
    //   instance.setPetalWidth(this.R.floatBetween(0.05, 0.2));
    //   instance.setPetalLength(this.R.floatBetween(0.1, 0.3));
    //   instance.setStemEnabled(false);
    // }

    for (
      let i = 0, j = this.instances.length, instance, rx, ry, rt;
      i < j;
      i++
    ) {
      rx = i % 10;
      ry = Math.floor(i / 10);
      rt = (rx + ry) / 100;
      instance = this.instances[i];
      instance.setHeight((0.2 - rt) * 10 + 0.25);
      instance.setDisplacement(new Vector3(0.2 - rt, 0.2 - rt, 0.2 - rt));
      instance.setOffset(new Vector3(rx * 0.001, ry * 0.001, 0));
      instance.setWindForce((0.2 - rt) * 3);
      instance.setWindDirection(
        new Vector3(-(10 - rx) * 0.15, (10 - ry) * 0.15, 0.2 - rt)
      );
      instance.setBerryDistanceFromStem((0.2 - rt) * 0.25);
      instance.setBerryColor(0x333333);
      //   instance.setColor(ColorFactory.getRandomColor(ColorFactory.FALL));
      //   instance.setBerryRotation((0.2 - rt) * 1440);
      instance.setRotationStart(new Vector3(0, 0, 0));
      instance.setRotationEnd(new Vector3(0, 0, Math.PI / 2));
      instance.setImagePath(TextureFactory.getStroke());
      instance.setTextureSize(new Vector2(10, 20));

      //   instance.setHeight(this.R.floatBetween(0.1, 1));
      //   instance.group.rotation.z = _Math.degToRad((i / j) * 360);
      //   instance.setSizeStart(
      //     new Vector2(
      //       this.R.floatBetween(0.05, 0.1),
      //       this.R.floatBetween(0.02, 0.04)
      //     )
      //   );
      //   instance.setSizeEnd(
      //     new Vector2(
      //       this.R.floatBetween(0.2, 0.6),
      //       this.R.floatBetween(0.1, 0.3)
      //     )
      //   );

      instance.setColor(0);
      instance.setHSLBase(new Vector3(0, 0, 0));
      instance.setHSLRange(new Vector3(0, 0, 0));
      //   instance.setImagePath(TextureFactory.getLine());

      instance.setPetalTarget(new Vector3(0, 0, -1));
    }

    // layout
    bounds.set(4, 4, 0);
    position.set(-2, -0.5, 2);
    new GridLayout({
      layoutType: LAYOUT_WALL,
      instances: this.instances,
      group: this.plantGroup,
      R: this.R,
      bounds,
      position
    });

    this.camera.position.x = 0;
    // this.plantGroup.rotation.z = _Math.degToRad(-45);
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

export default PetalPrintChapter;
