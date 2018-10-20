import { Group, Vector3, Box3, Object3D } from "three-full";

import BaseChapter from "./BaseChapter";
import StellariaPuberaSpawn from "art/stellaria-pubera/StellariaPuberaSpawn";
import Cube from "../art/cube/Cube";

class SummerGardenChapter extends BaseChapter {
  constructor(props = {}, camera, controls, R) {
    super(props, camera, controls, R);
  }

  init(props) {
    this.group = new Group();

    this.stellariaPuberaSpawn = new StellariaPuberaSpawn({
      R: this.R,
      camera: this.camera,
      controls: this.controls
    });
    this.group.add(this.stellariaPuberaSpawn.group);

    // this.cube = new Cube({ size: 0.25 });
    // this.group.add(this.cube.mesh);

    const from = {
        x: 0,
        y: 1,
        z: -10,
        tx: 0,
        ty: 1,
        tz: 1
      },
      to = {
        x: 0,
        y: 1,
        z: -0.25,
        tx: 0,
        ty: 1,
        tz: 1
      };
    // this.controls.animate({
    //   from,
    //   to,
    //   callback: () => this.onTransitionComplete()
    // });
  }

  onTransitionComplete() {
    const element = this.stellariaPuberaSpawn.getRandomInstance();
    this.focusElement({ element });
  }

  focusElement({ element }) {
    if (!element) return null;

    let boundingBox = new Box3().setFromObject(element.group);
    let center = boundingBox.getCenter();
    let tempObject = new Object3D();
    tempObject.position.set(center);
    let position = new Vector3(center.x, center.y, center.z);
    tempObject.localToWorld(position);

    // this.cube.mesh.position.set(position.x, position.y, position.z);

    const to = {
      x: position.x,
      y: position.y,
      z: position.z - 0.5,
      tx: position.x,
      ty: position.y,
      tz: position.z
    };

    this.controls.animate({
      to,
      callback: () => this.onTransitionComplete()
    });
  }
}

export default SummerGardenChapter;