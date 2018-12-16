import {
  Vector3,
  BufferGeometry,
  Geometry,
  CatmullRomCurve3,
  Mesh,
  MeshBasicMaterial,
  DoubleSide,
  LineBasicMaterial,
  Line
} from "three-full";
// import BendModifier from "three/modifiers/BendModifier";
import CurvePainter from "three/helpers/CurvePainter";
import ColorFactory from "util/ColorFactory";
import BaseRenderable from "art/common/BaseRenderable";

class SolomonsSealLeaf extends BaseRenderable {
  constructor(props) {
    super(props);

    const {
      pointCount = 12,
      length = 0.2,
      width = 0.5,
      midPoint = 0.4,
      lineCount = 5,
      camera,
      color = ColorFactory.getRandomColor()
    } = props;

    this.lines = [];
    this.lineMeshes = [];

    let geometry,
      offset,
      point,
      halfWidth = width >> 1;
    for (let i = 0; i < lineCount; i++) {
      point = i / (lineCount - 1);
      offset = new Vector3(point * width - halfWidth, 0, 0);
      geometry = this.createLine({
        length,
        width,
        offset,
        lineIndex: i / lineCount - 0.5,
        pointCount,
        midPoint,
        camera
      });

      this.lines.push(geometry);

      geometry.computeBoundingSphere();
      geometry.computeVertexNormals();

      const leafMesh = this.toBasicCurve({
        geometry,
        color,
        delay: i * 0.2,
        pointCount
      });
      this.group.add(leafMesh);
      this.lineMeshes.push(leafMesh);

      // const leaf = this.toCurve({
      //   geometry,
      //   color,
      //   delay: i * 0.2,
      //   pointCount,
      //   thickness,
      //   fogDensity: 0.3,
      //   camera
      // });
      // this.group.add(leaf.curvePainter.mesh);

      // use the 'outer' lines to create the fill
      this.fillMesh = this.createFill({
        line1: this.lines[0],
        line2: this.lines[this.lines.length - 1]
      });
      this.group.add(this.fillMesh);
    }

    // geometry.vertices = this.displaceGeometry({ geometry, R, rx, ry });
    // geometry.vertices = this.bendGeometry({ geometry, R });
  }

  createLine = ({
    length = 0.1,
    width = 0.05,
    lineIndex,
    geometry = new Geometry(),
    startPosition = new Vector3(0, 0, 0),
    midPoint = 0.4
  }) => {
    let vertices;

    geometry = geometry.clone();
    vertices = geometry.vertices;
    vertices.push(new Vector3(0.001, 0.001, 0.001));
    vertices.push(startPosition.clone());
    vertices.push(new Vector3(lineIndex * width, 0, length * midPoint));
    vertices.push(new Vector3(0, 0, length));
    vertices.reverse();

    return geometry;
  };

  toCurve = ({
    geometry,
    color,
    delay = 0,
    thickness = 0.2,
    pointCount = 8,
    fogColor,
    fogDensity,
    camera
  }) => {
    const curve = new CatmullRomCurve3(geometry.vertices, false, "catmullrom");

    const curvePainter = new CurvePainter({
      camera,
      curve,
      color,
      pointCount,
      lineWidth: thickness,
      delay,
      fogColor,
      fogDensity,
      canvasWidth: 32,
      canvasHeight: 8,
      animated: false
    });

    curvePainter.mesh.matrixAutoUpdate = true;

    return { curvePainter, geometry, curve };
  };

  toBasicCurve = ({ geometry, color, fogColor, fogDensity, camera }) => {
    const curve = new CatmullRomCurve3(geometry.vertices, false, "catmullrom");

    const points = curve.getPoints(50);
    const curveGeometry = new BufferGeometry().setFromPoints(points);

    const material = new LineBasicMaterial({
      color
    });

    const mesh = new Line(curveGeometry, material);
    return mesh;
  };

  createFill = ({ line1, line2 }) => {
    const fillVertices = [];
    const jLength = line1.vertices.length;
    for (let j = jLength - 1; j > 0; j--) {
      fillVertices.push(line1.vertices[j].clone());
    }
    for (let j = 0, jL = jLength; j < jL; j++) {
      fillVertices.push(line2.vertices[j].clone());
    }
    const fillGeometry = new BufferGeometry().setFromPoints(fillVertices);
    const fillMaterial = new MeshBasicMaterial({
      color: 0xffffff,
      wireframe: !true,
      side: DoubleSide
    });
    const fillMesh = new Mesh(fillGeometry, fillMaterial);
    fillMesh.castShadow = true;
    fillMesh.position.y = -0.001;

    return fillMesh;
  };

  update() {}

  clean() {
    for (let i = 0, iL = this.lineMeshes.length, line; i < iL; i++) {
      line = this.lineMeshes[i];
      this.group.remove(line);
      line.geometry.dispose();
      line.material.dispose();
      line = undefined;
    }

    this.lines = [];
    this.lineMeshes = [];

    this.group.remove(this.fillMesh);
    this.fillMesh.geometry.dispose();
    this.fillMesh.material.dispose();
    this.fillMesh = undefined;
  }
}

export default SolomonsSealLeaf;
