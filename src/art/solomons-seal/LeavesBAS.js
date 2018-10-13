import { Geometry, Shape, ShapeGeometry } from "three-full";
import LeafAnimation from "./LeafAnimation";

const LeavesBAS = ({
  leafCount,
  mesh,
  color,
  pointCount = 24,
  leafStartPoint,
  leafEndPoint,
  rotationStart,
  rotationEnd,
  sizeStart,
  sizeEnd,
  leafMidPoint,
  R,
  animated
}) => {
  // pinwheel
  // for (let i = 0, t, x, y, angle; i <= pointCount; i++) {
  //   angle = (TWO_PI / pointCount) * i;
  //   x = Math.cos(angle) * size;
  //   y = Math.sin(angle) * size;

  //   vertices.push([x, y]);
  // }

  const geometry = new Geometry(),
    curvePoints = mesh.curve.getPoints(pointCount);
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
    modelGeometry: geometry,
    color,
    animated
  });
  return leafAnimation;
};

export default LeavesBAS;
