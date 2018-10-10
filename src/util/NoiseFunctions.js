import { Vector3, Vector2 } from "three-full";
import { map } from "lodash";

import noise from "./perlin";

const flatNoise = ({
  points,
  scale = new Vector2(0.01, 0.01),
  displacement = 50
}) => {
  return map(points, point => {
    return new Vector3(
      point.x,
      point.y,
      noise(point.x * scale.x, point.y * scale.y, 0) * displacement
    );
  });
};

const noise1D = ({
  point,
  scale = 0.01,
  displacement = 50,
  offset = { x: 0, y: 0 }
}) => {
  const n = noise(point * scale + offset.x - 0.5) * displacement;
  const r = point + n;
  return r;
};

const noise2D = ({
  point,
  scale = new Vector2(0.01, 0.01),
  displacement = 50,
  offset = { x: 0, y: 0 }
}) => {
  const n =
    noise(
      point.x * scale.x + offset.x - 0.5,
      point.y * scale.y + offset.y - 0.5
    ) * displacement;
  const r = new Vector2(point.x + n, point.y + n);
  return r;
};

const noise3D = ({
  point,
  points,
  scale = new Vector3(0.01, 0.01, 0.01),
  perlinScale,
  displacement = new Vector3(1, 1, 1),
  offset = new Vector3(0, 0, 0)
}) => {
  if (typeof scale === "number") {
    console.error("scale should be a Vector3 not an integer");
  }
  if (perlinScale) {
    console.error("perlinScale is deprecated in favor of scale (Vector3)");
  }
  if (point) {
    const n =
      noise(
        point.x * scale.x + offset.x,
        point.y * scale.y + offset.y,
        point.z * scale.z + offset.z
      ) - 0.5;
    const r = new Vector3(
      point.x + n * displacement.x,
      point.y + n * displacement.y,
      point.z + n * displacement.z
    );
    return r;
  }
  if (points) {
    return map(points, p => {
      return noise3D({ point: p, scale, displacement, offset });
    });
  }
};

export { flatNoise, noise1D, noise2D, noise3D };
