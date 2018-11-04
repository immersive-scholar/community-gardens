import { Vector3 } from "three-full";

import BaseChapter from "./BaseChapter";
import BackgroundBAS from "art/background/BackgroundBAS";
import GroundBAS from "art/ground/GroundBAS";
import SolomonsSealSpawn from "art/solomons-seal/SolomonsSealSpawn";
import StellariaPuberaSpawn from "art/stellaria-pubera/StellariaPuberaSpawn";
import AsiminaTrilobaSpawn from "art/asimina-triloba/AsiminaTrilobaSpawn";
import ChapterPlate from "art/chapter-plate/ChapterPlate";
import ChapterTitle from "art/chapter-plate/ChapterTitle";
import InsecurityCalculator from "data/InsecurityCalculator";
import RandomLayout from "art/layouts/RandomLayout";
import { HOUSING_INSECURITY } from "constants/Stats";

class HousingInsecurityChapter extends BaseChapter {
  constructor(props = {}, camera, controls, R) {
    super(props, camera, controls, R);
  }

  init = () => {
    const stat = InsecurityCalculator.stats[HOUSING_INSECURITY];
    const { color, textArray, bgColor } = stat;

    const { quantityMultiplier } = this.settings;
    // const count = Math.min(stat.count, 10 * quantityMultiplier);
    const count = stat.count;
    const plantTypeCount = 3;
    const plantCount = Math.floor(count / plantTypeCount);

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
      color,
      textArray
    });
    this.chapterTitle.createChildren();
    this.addCleanable(this.chapterTitle, this.chapterTitle.group);

    let bounds = new Vector3(1, 1, 1),
      position = new Vector3();

    let data = InsecurityCalculator.getRandomRows({
      R: this.R,
      count,
      key: HOUSING_INSECURITY
    });

    // Solomon's Seal
    this.solomonsSealSpawn = new SolomonsSealSpawn({
      data: data,
      dataOffset: this.instances.length,
      count: plantCount,
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

    this.stellariaPuberaSpawn = new StellariaPuberaSpawn({
      data: data,
      dataOffset: this.instances.length,
      count: plantCount,
      R: this.R,
      camera: this.camera,
      controls: this.controls
    });

    bounds.set(4, 0, 2);
    position.set(-2, 0, 0.5);
    new RandomLayout({
      instances: this.stellariaPuberaSpawn.instances,
      group: this.stellariaPuberaSpawn.group,
      R: this.R,
      bounds,
      position
    });

    this.group.add(this.stellariaPuberaSpawn.group);
    this.addInstances(this.stellariaPuberaSpawn.instances);
    this.spawns.push(this.stellariaPuberaSpawn);

    // Asimina Triloba

    this.asiminaTrilobaSpawn = new AsiminaTrilobaSpawn({
      data: data,
      dataOffset: this.instances.length,
      count: plantCount,
      R: this.R,
      camera: this.camera,
      controls: this.controls
    });

    bounds.set(4, 0, 1);
    position.set(-2, 0, 0.5);
    new RandomLayout({
      R: this.R,
      instances: this.asiminaTrilobaSpawn.instances,
      bounds,
      position
    });

    this.group.add(this.asiminaTrilobaSpawn.group);
    this.addInstances(this.asiminaTrilobaSpawn.instances);
    this.spawns.push(this.asiminaTrilobaSpawn);
  };
}

export default HousingInsecurityChapter;
