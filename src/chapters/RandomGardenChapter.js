import { Group, Vector3 } from "three-full";

import BaseChapter from "./BaseChapter";
import BackgroundBAS from "art/background/BackgroundBAS";
import GroundBAS from "art/ground/GroundBAS";
import SolomonsSealSpawn from "art/solomons-seal/SolomonsSealSpawn";
import StellariaPuberaSpawn from "art/stellaria-pubera/StellariaPuberaSpawn";
import AsiminaTrilobaSpawn from "art/asimina-triloba/AsiminaTrilobaSpawn";
// import TextureFactory from "util/TextureFactory";
import ColorFactory from "util/ColorFactory";
import { LAYOUT_FLOOR, LAYOUT_WALL } from "art/layouts/LayoutConstants";
import RandomLayout from "art/layouts/RandomLayout";
import GridLayout from "art/layouts/GridLayout";
import { LookUpOffset, LookDownOffset } from "three/helpers/CameraOffsets";

class RandomGardenChapter extends BaseChapter {
  constructor(props = {}, camera, controls, R) {
    super(props, camera, controls, R);
  }

  init(props) {
    this.group = new Group();

    const bgColor = ColorFactory.getRandomColor(
      ColorFactory.SUMMER,
      ColorFactory.SKY
    );
    console.log("bgColor ", bgColor);

    this.background = new BackgroundBAS({ color: bgColor });
    this.group.add(this.background);

    this.ground = new GroundBAS({
      color: bgColor,
      R: this.R
    });
    this.group.add(this.ground);
    // this.ground.position.set(0, -10, 10);

    // this.plane = new Plane({ color: bgColor });
    // this.group.add(this.plane.group);

    let layoutType = LAYOUT_FLOOR,
      bounds = new Vector3(1, 1, 1),
      position = new Vector3();

    // Solomon's Seal

    this.solomonsSealSpawn = new SolomonsSealSpawn({
      count: 50,
      R: this.R,
      camera: this.camera,
      controls: this.controls
    });
    this.group.add(this.solomonsSealSpawn.group);

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
      count: 25,
      R: this.R,
      camera: this.camera,
      controls: this.controls
    });

    bounds.set(4, 1.5, 2);
    position.set(-2, 0.5, 0.5);
    new RandomLayout({
      instances: this.stellariaPuberaSpawn.instances,
      group: this.stellariaPuberaSpawn.group,
      R: this.R,
      bounds,
      position
    });

    this.group.add(this.stellariaPuberaSpawn.group);

    // Asimina Triloba

    this.asiminaTrilobaSpawn = new AsiminaTrilobaSpawn({
      count: 25,
      R: this.R,
      camera: this.camera,
      controls: this.controls
    });

    bounds.set(4, 1.5, 1);
    position.set(-2, 0.5, 0.5);
    new RandomLayout({
      R: this.R,
      instances: this.asiminaTrilobaSpawn.instances,
      layoutType,
      bounds,
      position
    });

    this.group.add(this.asiminaTrilobaSpawn.group);

    // const from = {
    //     x: 0,
    //     y: 0.25,
    //     z: -10,
    //     tx: 0,
    //     ty: 0.25,
    //     tz: 1
    //   },
    //   to = {
    //     x: 0,
    //     y: 0.25,
    //     z: -0.25,
    //     tx: 0,
    //     ty: 0.25,
    //     tz: 1
    //   };

    // this.controls.set({ x: 0, y: -0.75, z: -1.5, tx: 0, ty: 0.25, tz: 1 });

    // this.controls.animate({
    //   from,
    //   to,
    //   callback: () => this.onTransitionComplete()
    // });

    this.background.animateIn({ duration: 10, delay: 0.5 });
    this.ground.animateIn({ duration: 5, delay: 4 });
    this.ground.animateCliff({ cliff: 0.5, duration: 5, delay: 2 });

    this.stellariaPuberaSpawn.animateIn({ delay: 7, instanceDelay: 2 });
    this.asiminaTrilobaSpawn.animateIn({ delay: 7, instanceDelay: 0.5 });
    this.solomonsSealSpawn.animateIn({ delay: 7, instanceDelay: 0.5 });

    // const element = this.asiminaTrilobaSpawn.getRandomInstance();
    const element = this.stellariaPuberaSpawn.getRandomInstance();
    this.focusElement({ element, delay: 115, offset: LookDownOffset(this.R) });

    const to = {
      x: 0,
      y: 1,
      z: -1,
      tx: 0,
      ty: 1,
      tz: 0
    };

    this.animate({
      to,
      delay: 10,
      duration: 10,
      onComplete: () => {
        // this.controls.controls.autoRotate = true;
      }
    });
  }

  onTransitionComplete() {
    const element = this.stellariaPuberaSpawn.getRandomInstance();
    this.focusElement({
      element,
      delay: 2,
      offset: new LookDownOffset(this.R)
    });
  }
}

export default RandomGardenChapter;
