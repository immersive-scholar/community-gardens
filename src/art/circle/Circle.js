import {
  Vector3,
  Geometry,
  CatmullRomCurve3,
  _Math,
  MeshPhongMaterial,
  Group
} from "three-full";
import { TweenMax, Back } from "gsap";
import BendModifier from "three/modifiers/BendModifier";
import CurvePainter from "three/helpers/CurvePainter";
import ColorFactory from "util/ColorFactory";
import { noise3D } from "util/NoiseFunctions";
import { gradientTransform } from "util/GradientTransform";

const Circle = ({
  R,
  delay = 0,
  rx = R.random(),
  ry = R.random(),
  camera,
  radius = 0.5,
  totalRotation = 360,
  pointCount = R.floatBetween(8, 64),
  thickness = R.floatBetween(0.1, 1),
  color = ColorFactory.getRandomColor()
}) => {
  // stem
  const geometry = createGeometry({
    radius,
    pointCount
  });

  const group = new Group();
  geometry.vertices = displaceGeometry({ geometry, R, rx, ry });
  // geometry.vertices = bendGeometry({ geometry, R });

  geometry.computeBoundingSphere();
  geometry.computeVertexNormals();

  const renderable = toCurve({
    geometry,
    color,
    delay,
    pointCount,
    thickness,
    totalRotation,
    fogDensity: 0.3,
    camera
  });
  group.add(renderable.curvePainter.mesh);

  function createGeometry({ radius = 1, pointCount = 8 }) {
    let x,
      y,
      z,
      angle,
      point = new Vector3(),
      geometry = new Geometry();
    for (var i = 0; i < pointCount; i++) {
      angle = _Math.degToRad((totalRotation / pointCount) * i);
      x = Math.cos(angle) * radius;
      y = Math.sin(angle) * radius;
      z = 0;

      point = point.set(x, y, z);
      geometry.vertices.push(point.clone());
    }
    geometry.vertices.reverse();
    return geometry;
  }

  function displaceGeometry({ geometry, R, rx, ry }) {
    const scale = new Vector3(0.02, 0.02, 0.02),
      displacement = new Vector3(
        R.floatBetween(0.05, 0.1),
        R.floatBetween(0.05, 0.1),
        0
      ),
      offset = new Vector3(rx, ry, 0);
    let displacedPoints = noise3D({
      points: geometry.vertices,
      scale,
      displacement,
      offset
    });

    displacedPoints = gradientTransform({
      points: displacedPoints,
      start: new Vector3(0.1, 0.1, 0.1),
      end: new Vector3(5, 1, 5),
      ease: Back.easeOut
    });

    displacedPoints.reverse();
    return displacedPoints;
  }

  function bendGeometry({ geometry, R }) {
    var direction = new Vector3(0, 0, -R.random());
    var axis = new Vector3(R.random(), R.random(), 0);
    var angle = (Math.PI / 2) * R.floatBetween(0.5, 0.7);

    var bend = new BendModifier().set(direction, axis, angle);
    bend.modify(geometry);

    return geometry.vertices;
  }

  function toCurve({
    geometry,
    color,
    delay = 0,
    thickness = 0.2,
    pointCount = 8,
    fogColor,
    fogDensity,
    camera
  }) {
    const curve = new CatmullRomCurve3(geometry.vertices, false, "catmullrom");

    const curvePainter = new CurvePainter({
      camera,
      curve,
      color,
      pointCount,
      lineWidth: thickness,
      delay: delay,
      fogColor,
      fogDensity
      // canvasWidth: 16,
      // canvasHeight: 4
    });

    // curvePainter.mesh.matrixAutoUpdate = true;

    return { curvePainter, geometry, curve };
  }

  const createMaterial = () => {
    return new MeshPhongMaterial({ color: 0xff9900 });
  };

  return { group };
};

export default Circle;
