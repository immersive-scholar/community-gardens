import { Geometry, Vector3 } from "three-full";
import { noise3D } from "util/NoiseFunctions";

const SkyGeometry = ({
  width = 1,
  pointCount = 8,
  scale,
  displacement,
  offset,
  R
}) => {
  let x,
    y,
    z,
    point = new Vector3(),
    geometry = new Geometry();
  for (var i = 0; i < pointCount; i++) {
    x = (i / pointCount) * width;
    y = 0;
    z = 0;

    point.set(x, y, z);
    geometry.vertices.push(point.clone());
  }

  geometry.vertices = noise3D({
    points: geometry.vertices,
    scale,
    displacement,
    offset
  });

  geometry.vertices.reverse();
  geometry.center();

  geometry.computeBoundingSphere();
  geometry.computeVertexNormals();

  return geometry;
};

export default SkyGeometry;
