import {
  Mesh,
  MeshLambertMaterial,
  GridHelper,
  PlaneBufferGeometry
} from "three-full";

import BaseRenderable from "art/common/BaseRenderable";
import Cube from "../cube/Cube";

class Plane extends BaseRenderable {
  constructor(props) {
    super(props);

    const plane = this.createPlane();
    plane.position.y = -1;
    this.group.add(plane);

    // const grid = this.createGrid();
    // grid.position.y = 0.001;
    // this.group.add(grid);

    // const cube = new Cube({});
    // this.group.add(cube.mesh);
  }

  createPlane() {
    var planeGeometry = new PlaneBufferGeometry(5, 5, 1, 1);
    var planeMaterial = new MeshLambertMaterial({
      color: 0x000000,
      wireframe: !true
    });
    var plane = new Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    return plane;
  }

  createGrid() {
    var grid = new GridHelper(25, 25);
    return grid;
  }

  render() {}

  update() {
    this.render();
    super.update();
  }
}

export default Plane;
