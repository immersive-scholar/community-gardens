import {
  Vector3,
  BufferGeometry,
  Geometry,
  CatmullRomCurve3,
  Mesh,
  MeshBasicMaterial,
  DoubleSide
} from "three-full";
import { Back } from "gsap";
import BendModifier from "three/modifiers/BendModifier";
import CurvePainter from "three/helpers/CurvePainter";
import ColorSampler from "util/ColorSampler";
import { noise3D } from "util/NoiseFunctions";
import { gradientTransform } from "util/GradientTransform";
import BaseRenderable from "art/common/BaseRenderable";

class SolomonsSealLeaf extends BaseRenderable {
  constructor(props) {
    super(props);

    const {
      R,
      delay = 0,
      pointCount = 12,
      length = 4.8,
      width = 2.4,
      midPoint = 0.4,
      lineCount = 5,
      thickness = 0.2,
      camera,
      color = new ColorSampler().getRandomColor()
    } = props;

    const lines = [];

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

      lines.push(geometry);

      // geometry.computeBoundingSphere();
      // geometry.computeVertexNormals();

      const leaf = this.toCurve({
        geometry,
        color,
        delay: i * 0.2,
        pointCount,
        thickness,
        fogDensity: 0.02,
        camera
      });
      this.group.add(leaf.curvePainter.mesh);

      const fillMesh = this.createFill({
        line1: lines[0],
        line2: lines[lines.length - 1]
      });
      this.group.add(fillMesh);
    }

    // geometry.vertices = this.displaceGeometry({ geometry, R, rx, ry });
    // geometry.vertices = this.bendGeometry({ geometry, R });
  }

  createLine = ({
    length = 10,
    width = 5,
    pointCount = 8,
    offset = new Vector3(0, 0, 0),
    lineIndex,
    geometry = new Geometry(),
    startPosition = new Vector3(0, 0, 0),
    midPoint = 0.4
  }) => {
    let x,
      y,
      z,
      vertices,
      point = new Vector3();
    // for (var i = 0; i < pointCount; i++) {
    //   x = (i / pointCount) * length;
    //   y = 0;
    //   z = offset.x;

    //   point.set(x, y, z);
    //   geometry.vertices.push(point.clone());
    // }
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
      canvasHeight: 8
    });

    curvePainter.mesh.matrixAutoUpdate = true;

    return { curvePainter, geometry, curve };
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
}

export default SolomonsSealLeaf;
