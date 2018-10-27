import { Vector3 } from "three-full";
import { map } from "lodash";
import { Linear } from "gsap";

const Glitch = ({
  points,
  angle,
  amplitude,
  ease = Linear.easeNone,
  R,
  threshold = new Vector3(0.9, 0.9, 0.9)
}) => {
  let percent,
    newPoint = new Vector3();
  const pointCount = points.length;
  return map(points, (point, index) => {
    percent = 1 - ease.getRatio(index / pointCount);
    newPoint.copy(point);
    if (R.random() > threshold.x) newPoint.x -= percent * amplitude * angle.x;
    if (R.random() > threshold.y) newPoint.y -= percent * amplitude * angle.y;
    if (R.random() > threshold.z) newPoint.z -= percent * amplitude * angle.z;
    return newPoint.clone();
  });
};

export default Glitch;
