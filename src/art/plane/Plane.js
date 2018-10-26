import {
  Mesh,
  MeshPhongMaterial,
  GridHelper,
  CircleBufferGeometry
} from "three-full";

import BaseRenderable from "art/common/BaseRenderable";
import Cube from "../cube/Cube";

class Plane extends BaseRenderable {
  constructor(props) {
    super(props);

    const { color } = props;

    const plane = this.createPlane(color);
    plane.position.y = -1;
    this.group.add(plane);

    // const grid = this.createGrid();
    // grid.position.y = 0.001;
    // this.group.add(grid);

    // const cube = new Cube({});
    // this.group.add(cube.mesh);
  }

  createPlane(color) {
    var planeGeometry = new CircleBufferGeometry(32, 32);
    var planeMaterial = new MeshPhongMaterial({
      color,
      wireframe: !true,
      shininess: 30
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
