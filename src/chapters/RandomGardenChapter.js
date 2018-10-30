import { Group, Vector3 } from "three-full";

import BaseChapter from "./BaseChapter";
import BackgroundBAS from "art/background/BackgroundBAS";
import GroundBAS from "art/ground/GroundBAS";
// import SolomonsSealSpawn from "art/solomons-seal/SolomonsSealSpawn";
// import StellariaPuberaSpawn from "art/stellaria-pubera/StellariaPuberaSpawn";
import AsiminaTrilobaSpawn from "art/asimina-triloba/AsiminaTrilobaSpawn";
// import TextureFactory from "util/TextureFactory";
import ColorFactory from "util/ColorFactory";
import { LAYOUT_FLOOR } from "art/layouts/LayoutConstants";
import RandomLayout from "art/layouts/RandomLayout";
// import GridLayout from "art/layouts/GridLayout";

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

    // this.solomonsSealSpawn = new SolomonsSealSpawn({
    //   count: 100,
    //   R: this.R,
    //   camera: this.camera,
    //   controls: this.controls,
    //   columnWidth: 0.2,
    //   rowHeight: 0.2
    // });
    // this.group.add(this.solomonsSealSpawn.group);

    // this.stellariaPuberaSpawn = new StellariaPuberaSpawn({
    //   count: 5,
    //   R: this.R,
    //   camera: this.camera,
    //   controls: this.controls
    // });
    // this.group.add(this.stellariaPuberaSpawn.group);

    this.asiminaTrilobaSpawn = new AsiminaTrilobaSpawn({
      count: 50,
      R: this.R,
      camera: this.camera,
      controls: this.controls
    });

    const layoutType = LAYOUT_FLOOR,
      bounds = new Vector3(4, 1.5, 1),
      position = new Vector3(-2, 0.5, -0.5);
    const { R } = this;
    new RandomLayout({
      R,
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

    // this.stellariaPuberaSpawn.animateIn({ delay: 7, instanceDelay: 2 });
    this.asiminaTrilobaSpawn.animateIn({ delay: 7, instanceDelay: 2 });
    // this.solomonsSealSpawn.animateIn({ delay: 7, instanceDelay: 2 });

    const element = this.asiminaTrilobaSpawn.getRandomInstance();
    this.focusElement({ element, delay: 115 });

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
    const element = this.asiminaTrilobaSpawn.getRandomInstance();
    this.focusElement({ element, delay: 2 });
  }
}

export default RandomGardenChapter;
