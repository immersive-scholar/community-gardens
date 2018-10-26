import { Vector3 } from "three-full";
import { map } from "lodash";
import { Linear } from "gsap";

const gradientTransform = ({
  points,
  start = new Vector3(0, 0, 0),
  end = new Vector3(1, 1, 1),
  ease = Linear.easeNone
}) => {
  if (points) {
    const pointCount = points.length;
    return map(points, (point, index) => {
      let percent = ease.getRatio(index / pointCount);
      // this puts all vertices below halfway at 0, 0, 0
      // percent = index / pointCount > 0.5 ? percent : 0;
      const transformedPoint = new Vector3(
        point.x + point.x * percent * (start.x + end.x - start.x),
        point.y + point.y * percent * (start.y + end.y - start.y),
        point.z + point.z * percent * (start.z + end.z - start.z)
      );
      return transformedPoint;
    });
  }
};

export { gradientTransform };
