import {
  Quaternion,
  Vector2,
  Vector3,
  SphereGeometry,
  _Math
} from "three-full";
import { PrefabBufferGeometry, Timeline } from "three/vendor/BAS";
import BerryAnimation from "./BerryAnimation";

const Berries = ({
  berryCount,
  referenceMesh,
  size,
  color,
  R,
  animated,
  windForce = 0.1,
  windDirection = new Vector3(2, 2, 0),
  berryStartPoint = 0.3,
  berryEndPoint = 0.9,
  pointCount = 100,
  berryDisplacement = new Vector2(0.01, 0.01),
  berryDistanceFromStem = 0.1,
  berryRotation = 360,
  berrySpiral = true
}) => {
  const settings = {
    maxDelay: 0.0,
    timeScale: 1.0,
    backAmplitude: 2.0,
    elasticAmplitude: 1.0,
    elasticPeriod: 0.125
  };
  // calculate prefab size based on the number of prefabs to spread over the surface
  const prefab = new SphereGeometry(size, 8, 8);

  // setup prefab geometry
  const geometry = new PrefabBufferGeometry(prefab, berryCount);

  const timeline = new Timeline();

  timeline.add(2.0, {
    scale: {
      to: { x: 1.0, y: 1.0, z: 1.0 },
      ease: "easeElasticOut",
      // easeElastic receives two arguments (amplitude and period)
      easeParams: [settings.elasticAmplitude, settings.elasticPeriod]
    },
    translate: {
      to: { x: 0, y: 0, z: 0 },
      ease: "easeElasticOut",
      easeParams: [settings.elasticAmplitude, settings.elasticPeriod]
    }
  });

  const dataArray = [];
  const up = new Vector3(0, 1, 0);
  const normal = new Vector3();
  const quaternion = new Quaternion();

  const aPosition = geometry.createAttribute("aPosition", 3);
  const aDelayDuration = geometry.createAttribute("aDelayDuration", 3);
  const aQuaternion = geometry.createAttribute("aQuaternion", 4);

  this.totalDuration = timeline.duration;

  const curvePoints = referenceMesh.curve.getPoints(pointCount);
  curvePoints.reverse();

  for (let i = 0, ratio, positionIndex, position, angle; i < berryCount; i++) {
    ratio = i / berryCount;
    // animation
    dataArray[0] = settings.maxDelay * (i / berryCount);
    dataArray[1] = timeline.duration;
    geometry.setPrefabData(aDelayDuration, i, dataArray);

    // Spiral position
    // positionIndex =
    //   Math.ceil(berryStartPoint * pointCount) +
    //   Math.floor(ratio * pointCount * (berryEndPoint - berryStartPoint)) -
    //   1;
    // position = curvePoints[positionIndex];
    // angle = _Math.degToRad((1440 / pointCount) * i);
    // position.add(
    //   new Vector3(
    //     Math.cos(angle) * berryDisplacement.x * ratio,
    //     0,
    //     Math.sin(angle) * berryDisplacement.y * ratio
    //   )
    // );

    positionIndex =
      Math.ceil(berryStartPoint * pointCount) +
      Math.floor(ratio * pointCount * (berryEndPoint - berryStartPoint)) -
      1;
    position = curvePoints[positionIndex];

    // push away from stem
    if (berrySpiral) {
      angle = _Math.degToRad(berryRotation * ratio);
      position.x += Math.cos(angle) * berryDistanceFromStem * ratio;
      position.z += Math.sin(angle) * berryDistanceFromStem * ratio;
    }

    // arrange in circles
    // angle = _Math.degToRad(360 * ratio);
    // position.x += Math.cos(angle) * berryDisplacement.x;
    // position.y += Math.sin(angle) * berryDisplacement.y;

    position.toArray(dataArray);
    geometry.setPrefabData(aPosition, i, dataArray);

    // rotation
    normal.copy(position);
    normal.normalize();

    quaternion.setFromUnitVectors(up, normal);
    quaternion.toArray(dataArray);
    geometry.setPrefabData(aQuaternion, i, dataArray);
  }

  // geometry.center();
  geometry.computeBoundingSphere();
  geometry.computeVertexNormals();

  // feed the geometry to the animation
  const berryAnimation = new BerryAnimation({
    R,
    geometry,
    timeline,
    color,
    animated,
    windForce,
    windDirection,
    settings
  });
  return berryAnimation;
};

export default Berries;
