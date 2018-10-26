import { Mesh, BoxGeometry } from "three";
import { MeshPhongMaterial } from "three-full";

const Cube = ({ size = 1 }) => {
  const geometry = Cube.createGeometry(size);
  const material = Cube.createMaterial();

  const mesh = new Mesh(geometry, material);

  return {
    mesh
  };
};

Cube.createGeometry = size => {
  return new BoxGeometry(size, size, size);
};

Cube.createMaterial = () => {
  return new MeshPhongMaterial({ color: 0xff9900 });
};

export default Cube;
