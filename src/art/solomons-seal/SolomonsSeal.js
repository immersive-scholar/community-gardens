import {
  Vector3,
  Vector4,
  Geometry,
  Color,
  CatmullRomCurve3,
  InstancedBufferGeometry,
  InstancedBufferAttribute,
  Float32BufferAttribute,
  RawShaderMaterial,
  DoubleSide,
  Mesh
} from "three-full";
import { TweenMax, Linear, Back } from "gsap";
import BendModifier from "three/modifiers/BendModifier";
import CurvePainter from "three/helpers/CurvePainter";
import ColorSampler from "util/ColorSampler";
import { noise3D } from "util/NoiseFunctions";
import { gradientTransform } from "util/GradientTransform";
import BaseRenderable from "art/common/BaseRenderable";

import SolomonsSealLeaf from "./SolomonsSealLeaf";
import fragmentShaderSource from "./FragmentShaderSource";
import vertexShaderSource from "./VertexShaderSource";

class SolomonsSeal extends BaseRenderable {
  constructor(props) {
    super(props);

    const {
      R,
      delay = 0,
      rx = R.random(),
      ry = R.random(),
      camera,
      height = R.floatBetween(0.24, 0.96),
      leafCount = 10,
      pointCount = 10,
      thickness = R.floatBetween(0.01, 0.05),
      color = new ColorSampler().getRandomColor(),
      displacementScale = new Vector3(10, 1, 1)
    } = props;

    // stem
    const geometry = this.createStemGeometry({
      height,
      pointCount
    });
    geometry.vertices = this.displaceGeometry({
      geometry,
      R,
      rx,
      ry,
      displacementScale
    });
    // geometry.vertices = this.bendGeometry({ geometry, R });

    geometry.computeBoundingSphere();
    geometry.computeVertexNormals();

    const stem = this.toCurve({
      geometry,
      color,
      delay,
      pointCount,
      thickness,
      fogDensity: 0.2,
      camera
    });
    this.group.add(stem.curvePainter.mesh);

    // leaves
    // TODO pass thickness and pointCount to leaves
    const leaves = this.createLeaves({
      leafCount,
      height,
      mesh: stem,
      color,
      R,
      camera,
      pointCount
    });
    this.addAll(leaves);

    // this.leavesMesh = this.createLeavesInstanced({
    //   leafCount,
    //   height,
    //   mesh: stem,
    //   color,
    //   R,
    //   camera
    // });
    // this.group.add(this.leavesMesh);

    // this.currentTime = 0;
    // this.animateLeaves({ delay });
  }

  createStemGeometry = ({ height = 1, pointCount = 8 }) => {
    let x,
      y,
      z,
      point,
      geometry = new Geometry();
    for (var i = 0; i < pointCount; i++) {
      x = 0;
      y = (i / pointCount) * height;
      z = 0;

      point = new Vector3(x, y, z);
      geometry.vertices.push(point);
    }
    return geometry;
  };

  displaceGeometry = ({ geometry, R, rx, ry, displacementScale }) => {
    const displacement = new Vector3(
        R.floatBetween(0.1, 0.5),
        0,
        R.floatBetween(0.1, 0.5)
      ),
      offset = new Vector3(rx, ry, 0);
    let displacedPoints = noise3D({
      points: geometry.vertices,
      scale: displacementScale,
      displacement,
      offset
    });

    displacedPoints = gradientTransform({
      points: displacedPoints,
      start: new Vector3(0.001, 0.001, 0.001),
      end: new Vector3(1, 1, 1),
      ease: Back.easeOut
    });
    displacedPoints.reverse();

    return displacedPoints;
  };

  bendGeometry = ({ geometry, R }) => {
    var direction = new Vector3(0, 0, -R.random());
    var axis = new Vector3(R.random(), R.random(), 0);
    var angle = (Math.PI / 2) * R.floatBetween(0.5, 0.7);

    var bend = new BendModifier().set(direction, axis, angle);
    bend.modify(geometry);

    return geometry.vertices;
  };

  toCurve = ({
    geometry,
    color,
    delay = 0,
    thickness = 2,
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
      delay: delay,
      fogColor,
      fogDensity
      // canvasWidth: 16,
      // canvasHeight: 4
    });

    curvePainter.mesh.matrixAutoUpdate = true;

    return { curvePainter, geometry, curve };
  };

  createLeaves({
    leafCount = 10,
    pointCount = 10,
    mesh,
    color,
    height = 1,
    R,
    camera
  }) {
    const curvePoints = mesh.curve.getPoints(height * 100),
      leaves = [];

    curvePoints.reverse();

    for (
      let i = 0,
        ratio,
        leaf,
        startPoint = Math.ceil((height * 100) / 3),
        pos,
        size,
        positionIndex;
      i < leafCount;
      i += R(2) + 1
    ) {
      size = R.floatBetween(0.04, 0.12);
      ratio = i / leafCount;
      leaf = new SolomonsSealLeaf({
        color,
        length: size * 2 * (1 - ratio),
        width: size * (1 - ratio),
        camera,
        lineCount: R.intBetween(3, 5)
      });

      positionIndex =
        startPoint + Math.floor((i / leafCount) * height * 100 * 0.7) - 1;
      pos = curvePoints[positionIndex];
      leaf.group.position.x = pos.x;
      leaf.group.position.y = pos.y;
      leaf.group.position.z = pos.z;
      leaf.group.rotation.x = (Math.PI / 6) * ratio;
      leaf.group.rotation.y = (Math.PI / 2) * ratio;
      leaf.group.rotation.z = (Math.PI / 6) * ratio;

      this.group.add(leaf.group);
    }
    return leaves;
  }

  createLeavesInstanced({
    leafCount = 10,
    mesh,
    color,
    height = 10,
    R,
    camera
  }) {
    const vector = new Vector4();

    const instances = leafCount;

    const positions = [];
    const offsets = [];
    const orientationsStart = [];
    const orientationsEnd = [];

    positions.push(25, -25, 0);
    positions.push(-25, 25, 0);
    positions.push(0, 0, 25);

    // instanced attributes

    for (let i = 0; i < instances; i++) {
      // offsets
      offsets.push(i * 2, 0, i * 3);

      // orientation start
      vector.set(0, 0, 0, 0);
      vector.normalize();
      orientationsStart.push(vector.x, vector.y, vector.z, vector.w);

      // orientation end
      vector.set(-Math.PI / 2, 0, 0, 0);
      vector.normalize();
      orientationsEnd.push(vector.x, vector.y, vector.z, vector.w);
    }

    const geometry = new InstancedBufferGeometry();
    geometry.maxInstancedCount = instances; // set so its initalized for dat.GUI, will be set in first draw otherwise

    geometry.addAttribute("position", new Float32BufferAttribute(positions, 3));

    geometry.addAttribute(
      "offset",
      new InstancedBufferAttribute(new Float32Array(offsets), 3)
    );
    geometry.addAttribute(
      "orientationStart",
      new InstancedBufferAttribute(new Float32Array(orientationsStart), 4)
    );
    geometry.addAttribute(
      "orientationEnd",
      new InstancedBufferAttribute(new Float32Array(orientationsEnd), 4)
    );

    // material

    const material = new RawShaderMaterial({
      uniforms: {
        time: { value: 1.0 },
        sineTime: { value: 1.0 },
        color: { value: new Color(color) }
      },
      vertexShader: vertexShaderSource.join("\r\n"),
      fragmentShader: fragmentShaderSource.join("\r\n"),
      side: DoubleSide,
      transparent: true
    });

    const leavesMesh = new Mesh(geometry, material);

    return leavesMesh;
  }

  animateLeaves({ delay }) {
    TweenMax.to(this, 2, {
      currentTime: 1,
      onUpdate: () => {
        this.update();
      },
      ease: Linear.easeNone,
      delay,
      yoyo: true,
      repeat: -1
    });
  }

  getPositionAt(v) {
    return [0, 10, 0];
  }

  render() {}

  update() {
    this.leavesMesh.material.uniforms.time.value = this.currentTime;
  }
}

export default SolomonsSeal;
