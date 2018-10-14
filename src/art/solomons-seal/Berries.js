import {
  Quaternion,
  Shape,
  ShapeGeometry,
  Vector2,
  MeshBasicMaterial,
  Mesh,
  Vector3,
  SphereGeometry,
  Color
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
  windDirection = new Vector3(2, 2, 0)
}) => {
  const settings = {
    maxDelay: 0.0,
    timeScale: 1.0,
    backAmplitude: 2.0,
    elasticAmplitude: 1.0,
    elasticPeriod: 0.125
  };
  // calculate prefab size based on the number of prefabs to spread over the surface
  const prefab = new SphereGeometry(size, 16, 16);

  // setup prefab geometry
  const geometry = new PrefabBufferGeometry(prefab, berryCount);
  const berryColor = new Color(color);

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

  for (let i = 0, position; i < berryCount; i++) {
    // animation
    dataArray[0] = settings.maxDelay * (i / berryCount);
    dataArray[1] = timeline.duration;
    geometry.setPrefabData(aDelayDuration, i, dataArray);

    // position
    position = new Vector3(R.random(), R.random(), R.random());

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
