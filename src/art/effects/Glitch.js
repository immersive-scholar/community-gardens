import { Vector3 } from "three-full";
import { map } from "lodash";
import { Linear, Power2 } from "gsap";

const Glitch = ({
  points,
  angle,
  amplitude,
  ease = Linear.easeNone,
  R,
  threshold = new Vector3(0.9, 0.9, 0.9)
}) => {
  let percent,
    newPoint = new Vector3(),
    lastPoint = new Vector3();
  const pointCount = points.length;
  return map(points, (point, index) => {
    percent = 1 - ease.getRatio(index / pointCount);
    newPoint.copy(point);
    if (R.random() > threshold.x)
      newPoint.x = lastPoint.x + percent * amplitude * angle.x;
    if (R.random() > threshold.y)
      newPoint.y = lastPoint.y + percent * amplitude * angle.y;
    if (R.random() > threshold.z)
      newPoint.z = lastPoint.y + percent * amplitude * angle.z;
    lastPoint.copy(newPoint);
    return newPoint.clone();
  });
};

export default Glitch;
