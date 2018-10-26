import { Vector2, Shape, ShapeGeometry } from "three-full";

const StellaPuberaPetalSHape = ({
  width = 0.025,
  length = 0.125,
  petalMidPointRatio = 0.5,
  petalLowerMidPointRatio = 0.2
}) => {
  // 1 draw the shape
  const shape = new Shape();

  const halfWidth = width / 2,
    petalMidPoint = petalMidPointRatio * length,
    petalLowerMidPoint = petalLowerMidPointRatio * length;
  let anchor1 = new Vector2(0, petalLowerMidPoint);
  let anchor2 = new Vector2(halfWidth, petalLowerMidPoint);
  let endPoint = new Vector2(halfWidth, petalMidPoint);
  shape.moveTo(0, 0);
  shape.bezierCurveTo(
    anchor1.x,
    anchor1.y,
    anchor2.x,
    anchor2.w,
    endPoint.x,
    endPoint.y
  );

  anchor1.set(halfWidth, petalMidPoint);
  anchor2.set(0, length);
  endPoint.set(0, length);
  shape.quadraticCurveTo(anchor1.x, anchor1.y, endPoint.x, endPoint.y);

  anchor1.set(halfWidth, petalMidPoint);
  anchor2.set(0, length);
  endPoint.set(-halfWidth, petalMidPoint);
  shape.lineTo(endPoint.x, endPoint.y);

  anchor1.set(-halfWidth, petalLowerMidPoint);
  anchor2.set(0, petalLowerMidPoint);
  endPoint.set(0, 0);
  shape.bezierCurveTo(
    anchor1.x,
    anchor1.y,
    anchor2.x,
    anchor2.w,
    endPoint.x,
    endPoint.y
  );

  // use the shape to create a geometry
  const shapeGeometry = new ShapeGeometry(shape);

  return shapeGeometry;
};

export default StellaPuberaPetalSHape;
