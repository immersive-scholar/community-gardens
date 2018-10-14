import {
  Mesh,
  PlaneGeometry,
  Geometry,
  Vector3,
  Face3,
  MeshPhongMaterial,
  DoubleSide
} from "three-full";

const Square = ({ width = 1, height = 1, length = 1 }) => {
  const geometry = Square.createGeometry(width, height, length);
  const material = Square.createMaterial();

  const mesh = new Mesh(geometry, material);

  return {
    mesh
  };
};

Square.createGeometry = (width, height) => {
  const geometry = new PlaneGeometry(width, height, 8, 8, true);
  geometry.computeBoundingSphere();

  return geometry;
};

Square.createMaterial = () => {
  return new MeshPhongMaterial({
    color: 0xff9900,
    side: DoubleSide,
    shininess: 30
  });
};

export default Square;
