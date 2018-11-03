import { Vector3 } from "three-full";

import BaseChapter from "./BaseChapter";
import BackgroundBAS from "art/background/BackgroundBAS";
import GroundBAS from "art/ground/GroundBAS";
import SolomonsSealSpawn from "art/solomons-seal/SolomonsSealSpawn";
import StellariaPuberaSpawn from "art/stellaria-pubera/StellariaPuberaSpawn";
import AsiminaTrilobaSpawn from "art/asimina-triloba/AsiminaTrilobaSpawn";
import ChapterPlate from "art/chapter-plate/ChapterPlate";
import ColorFactory from "util/ColorFactory";
import InsecurityCalculator from "data/InsecurityCalculator";
import RandomLayout from "art/layouts/RandomLayout";
// import TextureFactory from "util/TextureFactory";
import { LookUpOffset, LookDownOffset } from "three/helpers/CameraOffsets";
import { DID_NOT_EAT_FOR_A_DAY } from "../constants/Stats";

class DidNotEatForADayChapter extends BaseChapter {
  constructor(props = {}, camera, controls, R) {
    super(props, camera, controls, R);
  }

  init = props => {
    const stat = InsecurityCalculator.stats[DID_NOT_EAT_FOR_A_DAY];

    const bgColor = ColorFactory.getRandomColor(
      ColorFactory.WINTER,
      ColorFactory.SKY
    );
    console.log("bgColor ", bgColor);

    this.background = new BackgroundBAS({ color: bgColor });
    this.addCleanable(this.background);

    this.ground = new GroundBAS({
      color: bgColor,
      R: this.R
    });
    this.addCleanable(this.ground);
    // this.ground.position.set(0, -10, 10);

    // this.plane = new Plane({ color: bgColor });
    // this.group.add(this.plane.group);

    // this.chapterPlate = new ChapterPlate({
    //   camera: this.camera,
    //   color: 0xffffff,
    //   textColor: 0x32394f,
    //   textArray: [
    //     { size: 0.1, text: "GARDEN OF STUDENTS", offsetY: 1.4 },
    //     { size: 0.25, text: "Who Did Not", offsetY: 1 },
    //     { size: 0.25, text: "Eat For a Day.", offsetY: 0.6 }
    //   ]
    // });
    // this.addCleanable(this.chapterPlate, this.chapterPlate.group);

    let bounds = new Vector3(1, 1, 1),
      position = new Vector3();

    // Solomon's Seal

    let data = InsecurityCalculator.getRandomRows({
      R: this.R,
      count: 100,
      key: DID_NOT_EAT_FOR_A_DAY
    });

    this.solomonsSealSpawn = new SolomonsSealSpawn({
      data: data,
      count: 100,
      R: this.R,
      camera: this.camera,
      controls: this.controls
    });
    this.group.add(this.solomonsSealSpawn.group);
    this.addInstances(this.solomonsSealSpawn.instances);

    bounds.set(4, 0, 2);
    position.set(-2, 0, 0.5);
    new RandomLayout({
      instances: this.solomonsSealSpawn.instances,
      group: this.solomonsSealSpawn.group,
      R: this.R,
      bounds,
      position
    });

    // Stellaria Pubera

    // this.stellariaPuberaSpawn = new StellariaPuberaSpawn({
    //   count: 25,
    //   R: this.R,
    //   camera: this.camera,
    //   controls: this.controls
    // });

    // bounds.set(4, 0, 2);
    // position.set(-2, 0, 0.5);
    // new RandomLayout({
    //   instances: this.stellariaPuberaSpawn.instances,
    //   group: this.stellariaPuberaSpawn.group,
    //   R: this.R,
    //   bounds,
    //   position
    // });

    // this.group.add(this.stellariaPuberaSpawn.group);
    // this.addInstances(this.stellariaPuberaSpawn.instances);

    // Asimina Triloba

    // this.asiminaTrilobaSpawn = new AsiminaTrilobaSpawn({
    //   count: 25,
    //   R: this.R,
    //   camera: this.camera,
    //   controls: this.controls
    // });

    // bounds.set(4, 0, 1);
    // position.set(-2, 0, 0.5);
    // new RandomLayout({
    //   R: this.R,
    //   instances: this.asiminaTrilobaSpawn.instances,
    //   bounds,
    //   position
    // });

    // this.group.add(this.asiminaTrilobaSpawn.group);
    // this.addInstances(this.asiminaTrilobaSpawn.instances);
  };

  animateIn = ({ delay = 0 } = {}) => {
    return new Promise((resolve, reject) => {
      // We need to resolve the animateIn once a bunch of animations have run
      // so we're storing these for later retrieval.
      this.resolve = resolve;
      this.reject = reject;

      // this.ground.animateIn({ duration: 5, delay: 4 });
      // this.ground.animateCliff({ cliff: 0.5, duration: 5, delay: 2 });

      this.background.time = 1;
      this.background.update();
      this.ground.time = 1;
      this.ground.cliff = 1;
      this.ground.update();

      this.solomonsSealSpawn.animateIn({ delay: 2, instanceDelay: 0.3 });
      // this.stellariaPuberaSpawn.animateIn({ delay: 4, instanceDelay: 0.3 });
      // this.asiminaTrilobaSpawn.animateIn({ delay: 6, instanceDelay: 0.3 });

      const element = this.getRandomInstance();
      element.createChildren();
      element.animateIn({ delay: 8, duration: 7 });
      this.focusElement({
        element,
        delay: 15,
        duration: 10,
        offset: element.state.lookUpAt
          ? LookUpOffset(this.R)
          : LookDownOffset(this.R)
      });
    });
  };
}

export default DidNotEatForADayChapter;
