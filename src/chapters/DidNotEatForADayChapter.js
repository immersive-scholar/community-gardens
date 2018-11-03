import { Vector3 } from "three-full";

import BaseChapter from "./BaseChapter";
import BackgroundBAS from "art/background/BackgroundBAS";
import GroundBAS from "art/ground/GroundBAS";
import SolomonsSealSpawn from "art/solomons-seal/SolomonsSealSpawn";
import StellariaPuberaSpawn from "art/stellaria-pubera/StellariaPuberaSpawn";
import AsiminaTrilobaSpawn from "art/asimina-triloba/AsiminaTrilobaSpawn";
import ChapterPlate from "art/chapter-plate/ChapterPlate";
import ChapterTitle from "art/chapter-plate/ChapterTitle";
import ColorFactory from "util/ColorFactory";
import InsecurityCalculator from "data/InsecurityCalculator";
import RandomLayout from "art/layouts/RandomLayout";
// import TextureFactory from "util/TextureFactory";
import { DID_NOT_EAT_FOR_A_DAY } from "../constants/Stats";

class DidNotEatForADayChapter extends BaseChapter {
  constructor(props = {}, camera, controls, R) {
    super(props, camera, controls, R);
  }

  init = props => {
    const stat = InsecurityCalculator.stats[DID_NOT_EAT_FOR_A_DAY];
    const { quantityMultiplier } = this.settings;

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

    this.chapterPlate = new ChapterPlate({
      camera: this.camera,
      color: bgColor
    });
    this.addCleanable(this.chapterPlate, this.chapterPlate.group);

    this.chapterTitle = new ChapterTitle({
      color: 0xffffff,
      textArray: [
        { size: 0.1, text: "GARDEN OF STUDENTS", offsetY: 1.4 },
        { size: 0.25, text: "Who Did Not", offsetY: 1 },
        { size: 0.25, text: "Eat For a Day", offsetY: 0.6 }
      ]
    });
    this.chapterTitle.createChildren();
    this.addCleanable(this.chapterTitle, this.chapterTitle.group);

    let bounds = new Vector3(1, 1, 1),
      position = new Vector3();

    // Solomon's Seal

    const count = 10 * quantityMultiplier;

    let data = InsecurityCalculator.getRandomRows({
      R: this.R,
      count,
      key: DID_NOT_EAT_FOR_A_DAY
    });

    this.solomonsSealSpawn = new SolomonsSealSpawn({
      data: data,
      count,
      R: this.R,
      camera: this.camera,
      controls: this.controls
    });
    this.group.add(this.solomonsSealSpawn.group);
    this.addInstances(this.solomonsSealSpawn.instances);
    this.spawns.push(this.solomonsSealSpawn);

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
    //   count,
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
    // this.spawns.push(this.stellariaPuberaSpawn);

    // Asimina Triloba

    // this.asiminaTrilobaSpawn = new AsiminaTrilobaSpawn({
    //   count,
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
    // this.spawns.push(this.asiminaTrilobaSpawn);
  };
}

export default DidNotEatForADayChapter;
