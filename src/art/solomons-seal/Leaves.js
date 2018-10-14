import {
  Geometry,
  Shape,
  ShapeGeometry,
  Vector2,
  MeshBasicMaterial,
  Mesh,
  Vector3
} from "three-full";
import LeafAnimation from "./LeafAnimation";

const Leaves = ({
  leafCount,
  referenceMesh,
  color,
  pointCount = 24,
  leafStartPoint,
  leafEndPoint,
  rotationStart,
  rotationEnd,
  sizeStart,
  sizeEnd,
  leafMidPoint,
  leafTextureSize = new Vector2(
    (1 / (1 - sizeStart.x * sizeEnd.x)) * 10,
    (-1 / (1 - sizeStart.y * sizeEnd.y)) * 10
  ),
  R,
  animated,
  windForce = 0.1,
  windDirection = new Vector3(2, 2, 0),
  hslBase,
  hslRange
}) => {
  // pinwheel
  // for (let i = 0, t, x, y, angle; i <= pointCount; i++) {
  //   angle = (TWO_PI / pointCount) * i;
  //   x = Math.cos(angle) * size;
  //   y = Math.sin(angle) * size;

  //   vertices.push([x, y]);
  // }

  const geometry = new Geometry(),
    curvePoints = referenceMesh.curve.getPoints(pointCount);
  curvePoints.reverse();

  for (
    let i = 0,
      ratio,
      pos,
      length,
      width,
      positionIndex,
      lineIndex,
      shape,
      shapeGeometry;
    i < leafCount;
    i += R(2) + 1
  ) {
    ratio = i / leafCount;
    length = sizeStart.x + (sizeEnd.x - sizeStart.x) * (1 - ratio);
    width = sizeStart.y + (sizeEnd.y - sizeStart.y) * (1 - ratio);
    lineIndex = ratio - 0.5;

    positionIndex =
      Math.ceil(leafStartPoint * pointCount) +
      Math.floor(
        (i / leafCount) * pointCount * (leafEndPoint - leafStartPoint)
      ) -
      1;
    pos = curvePoints[positionIndex];

    // draw the shape
    shape = new Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(
      lineIndex * width,
      leafMidPoint * length,
      lineIndex * width,
      leafMidPoint * length,
      0,
      length
    );
    shape.bezierCurveTo(
      -lineIndex * width,
      leafMidPoint * length,
      -lineIndex * width,
      leafMidPoint * length,
      0,
      0
    );

    // use the shape to create a geometry
    shapeGeometry = new ShapeGeometry(shape);

    // shapeGeometry.rotateX(rotationStep.x * ratio);
    // shapeGeometry.rotateY(rotationStep.y * ratio);
    // shapeGeometry.rotateZ(rotationStep.z * ratio);

    shapeGeometry.rotateX(
      rotationStart.x + (rotationEnd.x - rotationStart.x) * ratio
    );
    shapeGeometry.rotateY(
      rotationStart.y + (rotationEnd.y - rotationStart.y) * ratio
    );
    shapeGeometry.rotateZ(
      rotationStart.z + (rotationEnd.z - rotationStart.z) * ratio
    );

    shapeGeometry.translate(pos.x, -pos.z, pos.y);
    shapeGeometry.rotateX(-Math.PI / 2);

    // merge into the whole
    geometry.merge(shapeGeometry);
  }

  // geometry.center();

  // 5. feed the geometry to the animation
  const leafAnimation = new LeafAnimation({
    R,
    modelGeometry: geometry,
    color,
    animated,
    leafTextureSize,
    windForce,
    windDirection,
    hslBase,
    hslRange
  });
  return leafAnimation;
};

export default Leaves;
