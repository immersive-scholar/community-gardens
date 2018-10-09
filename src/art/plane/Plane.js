import {
  Mesh,
  MeshLambertMaterial,
  GridHelper,
  PlaneBufferGeometry
} from "three-full";

import BaseRenderable from "art/common/BaseRenderable";

class Plane extends BaseRenderable {
  constructor(props) {
    super(props);

    const plane = this.createPlane();
    // const grid = this.createGrid();

    this.group.add(plane);
    // this.group.add(grid);
  }

  createPlane() {
    var planeGeometry = new PlaneBufferGeometry(50, 50, 1, 1);
    var planeMaterial = new MeshLambertMaterial({
      color: 0xffffff,
      wireframe: !true
    });
    var plane = new Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    return plane;
  }

  createGrid() {
    var grid = new GridHelper(250, 25, 0x000000, 0x000000);
    grid.material.opacity = 0.5;
    grid.material.transparent = true;
    return grid;
  }

  render() {}

  update() {
    this.render();
    super.update();
  }
}

export default Plane;
