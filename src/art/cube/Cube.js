import { Mesh, BoxGeometry, MeshPhongMaterial } from "three-full";

const Cube = ({ width = 1, height = 1, length = 1 }) => {
  const geometry = Cube.createGeometry(width, height, length);
  const material = Cube.createMaterial();

  const mesh = new Mesh(geometry, material);

  return {
    mesh
  };
};

Cube.createGeometry = (width, height, length) => {
  return new BoxGeometry(width, length, height);
};

Cube.createMaterial = () => {
  return new MeshPhongMaterial({ color: 0xff9900 });
};

export default Cube;
