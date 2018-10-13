import { Geometry, Vector3 } from "three-full";
import { noise3D } from "util/NoiseFunctions";
import { gradientTransform } from "util/GradientTransform";
import { Power2 } from "gsap";

const StemGeometry = ({
  height = 1,
  pointCount = 8,
  scale,
  displacement,
  offset
}) => {
  let x,
    y,
    z,
    point,
    geometry = new Geometry();
  for (var i = 0; i < pointCount; i++) {
    x = 0;
    y = (i / pointCount) * height;
    z = 0;

    point = new Vector3(x, y, z);
    geometry.vertices.push(point);
  }

  geometry.vertices = noise3D({
    points: geometry.vertices,
    scale,
    displacement,
    offset
  });

  geometry.vertices.reverse();

  // reduces noise at the bottom
  geometry.vertices = gradientTransform({
    points: geometry.vertices,
    start: new Vector3(0.001, 1, 0.001),
    end: new Vector3(1, 1, 1), // increasing the end vector results in more choatic/windy appearance
    ease: Power2.easeIn
  });

  geometry.computeBoundingSphere();
  geometry.computeVertexNormals();

  return geometry;
};

export default StemGeometry;
