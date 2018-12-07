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

    const { color } = props;

    const plane = this.createPlane(color);
    this.group.add(plane);

    // const grid = this.createGrid();
    // grid.position.y = 0.001;
    // this.group.add(grid);
  }

  createPlane(color) {
    var planeGeometry = new PlaneBufferGeometry(32, 32);
    var planeMaterial = new MeshLambertMaterial({
      color,
      wireframe: !true,
      fog: !true
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
