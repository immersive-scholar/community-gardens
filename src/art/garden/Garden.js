import { Mesh, BoxGeometry } from "three";
import { MeshPhongMaterial } from "three-full";

const Garden = ({ size = 1 }) => {
  const geometry = Garden.createGeometry(size);
  const material = Garden.createMaterial();

  const mesh = new Mesh(geometry, material);

  return {
    mesh
  };
};

Garden.createGeometry = size => {
  return new BoxGeometry(size, size, size);
};

Garden.createMaterial = () => {
  return new MeshPhongMaterial({ color: 0xff9900 });
};

export default Garden;
