import {
  Vector2,
  Vector3,
  Vector4,
  Geometry,
  Face3,
  Color,
  CatmullRomCurve3,
  InstancedBufferGeometry,
  InstancedBufferAttribute,
  Float32BufferAttribute,
  RawShaderMaterial,
  DoubleSide,
  Mesh,
  _Math,
  Shape,
  ShapeGeometry
} from "three-full";
import { TweenMax, Linear } from "gsap";
import BendModifier from "three/modifiers/BendModifier";
import CurvePainter from "three/helpers/CurvePainter";
import ColorSampler from "util/ColorSampler";
import { noise3D } from "util/NoiseFunctions";
// import { gradientTransform } from "util/GradientTransform";
import BaseRenderable from "art/common/BaseRenderable";

import SolomonsSealLeaf from "./SolomonsSealLeaf";
import fragmentShaderSource from "./FragmentShaderSource";
import vertexShaderSource from "./VertexShaderSource";
import LeafAnimation from "./LeafAnimation";

const Delaunay = require("../crystals/Delaunay");

class SolomonsSeal extends BaseRenderable {
  constructor(props, camera, R) {
    super(props);

    this.leaves = [];
    this.camera = camera;
    this.R = R;

    this.init(props);
  }

  init = (props = {}) => {
    this.setState(props);

    this.clean();

    const {
      height = this.R.floatBetween(0.24, 0.96),
      displacement = new Vector3(0.2, 0.1, 0.2),
      scale = new Vector3(2, 2, 4),
      offset = new Vector3(this.R.random(), this.R.random(), this.R.random()),
      animated = true,
      leafCount = 10,
      pointCount = height * 10,
      thickness = 0.02,
      color = new ColorSampler().getRandomColor(),
      delay = 0,
      leafStartPoint = 0.3,
      leafEndPoint = 1,
      rotationStep = new Vector3(0.5, 1.7, 0.2),
      sizeStep = new Vector2(0.2, 0.1)
    } = this.state;

    // stem
    this.geometry = this.createStemGeometry({
      height,
      pointCount
    });
    this.geometry.vertices = this.displaceGeometry({
      geometry: this.geometry,
      scale,
      displacement,
      offset
    });
    // geometry.vertices = this.bendGeometry({ geometry, R });

    this.geometry.computeBoundingSphere();
    this.geometry.computeVertexNormals();

    this.stem = this.toCurve({
      geometry: this.geometry,
      color,
      delay,
      pointCount,
      thickness,
      fogDensity: 0.3,
      animated
    });
    this.group.add(this.stem.curvePainter.mesh);

    // leaves
    // this.leaves = this.createLeaves({
    //   leafCount,
    //   height,
    //   mesh: this.stem,
    //   color,
    //   pointCount,
    //   leafStartPoint,
    //   leafEndPoint,
    //   rotationStep,
    //   sizeStep
    // });
    // this.addAll(this.leaves);

    // this.leavesMesh = this.createLeavesInstanced({
    //   leafCount,
    //   height,
    //   mesh: this.stem,
    //   color
    // });
    // this.group.add(this.leavesMesh);

    this.leavesMesh = this.createLeavesBAS({
      leafCount,
      size: 0.1,
      centerX: 0,
      centerY: 0,
      mesh: this.stem,
      color,
      pointCount: pointCount * 3,
      leafStartPoint,
      leafEndPoint,
      sizeStep,
      rotationStep,
      leafMidPoint: 0.4
    });
    this.group.add(this.leavesMesh);

    // this.currentTime = 0;
    // this.animateLeaves({ delay });
  };

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

  displaceGeometry = ({ geometry, displacement, offset, scale }) => {
    let displacedPoints = noise3D({
      points: geometry.vertices,
      scale,
      displacement,
      offset
    });

    // displacedPoints = gradientTransform({
    //   points: displacedPoints,
    //   start: new Vector3(0.001, 0.001, 0.001),
    //   end: new Vector3(1, 1, 1),
    //   ease: Back.easeOut
    // });
    displacedPoints.reverse();

    return displacedPoints;
  };

  bendGeometry = ({ geometry, R }) => {
    var direction = new Vector3(0, 0, -this.R.random());
    var axis = new Vector3(this.R.random(), this.R.random(), 0);
    var angle = (Math.PI / 2) * this.R.floatBetween(0.5, 0.7);

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
    animated
  }) => {
    const curve = new CatmullRomCurve3(geometry.vertices, false, "catmullrom");

    const curvePainter = new CurvePainter({
      camera: this.camera,
      curve,
      color,
      pointCount,
      lineWidth: thickness,
      delay: delay,
      fogColor,
      fogDensity,
      animated
    });

    curvePainter.mesh.matrixAutoUpdate = true;

    return { curvePainter, geometry, curve };
  };

  createLeaves({
    leafCount = 10,
    mesh,
    color,
    height = 1,
    leafStartPoint,
    leafEndPoint,
    pointCount,
    rotationStep,
    sizeStep
  }) {
    const curvePoints = mesh.curve.getPoints(pointCount),
      leaves = [];

    curvePoints.reverse();

    for (
      let i = 0, ratio, leaf, pos, length, width, positionIndex;
      i < leafCount;
      i += this.R(2) + 1
    ) {
      // size = this.R.floatBetween(0.04, 0.12);
      ratio = i / leafCount;
      length = (1 - ratio) * sizeStep.x;
      width = (1 - ratio) * sizeStep.y;
      leaf = new SolomonsSealLeaf({
        color,
        length,
        width,
        camera: this.camera,
        lineCount: this.R.intBetween(3, 5)
      });

      positionIndex =
        Math.ceil(leafStartPoint * pointCount) +
        Math.floor(
          (i / leafCount) * pointCount * (leafEndPoint - leafStartPoint)
        ) -
        1;
      pos = curvePoints[positionIndex];
      leaf.group.position.x = pos.x;
      leaf.group.position.y = pos.y;
      leaf.group.position.z = pos.z;
      leaf.group.rotation.x = rotationStep.x * ratio;
      leaf.group.rotation.y = rotationStep.y * ratio;
      leaf.group.rotation.z = rotationStep.z * ratio;

      this.group.add(leaf.group);
      leaves.push(leaf);
    }
    return leaves;
  }

  createLeavesInstanced({ leafCount = 10, mesh, color, height = 10 }) {
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

  createLeavesBAS({
    leafCount,
    mesh,
    color,
    pointCount = 24,
    extrudeAmount = 0.001,
    leafStartPoint,
    leafEndPoint,
    rotationStep,
    sizeStep,
    centerX = 0.5,
    centerY = 0.5,
    leafMidPoint
  }) {
    let vertices = [[centerX, centerY]],
      TWO_PI = Math.PI * 2,
      indices,
      i,
      j;

    // pinwheel
    // for (let i = 0, t, x, y, angle; i <= pointCount; i++) {
    //   angle = (TWO_PI / pointCount) * i;
    //   x = Math.cos(angle) * size;
    //   y = Math.sin(angle) * size;

    //   vertices.push([x, y]);
    // }

    const geometry = new Geometry(),
      curvePoints = mesh.curve.getPoints(pointCount),
      leaves = [];
    curvePoints.reverse();

    for (
      let i = 0,
        ratio,
        leaf,
        pos,
        length,
        width,
        positionIndex,
        lineIndex,
        shape,
        shapeGeometry;
      i < leafCount;
      i += this.R(2) + 1
    ) {
      ratio = i / leafCount;
      length = (1 - ratio) * sizeStep.x;
      width = (1 - ratio) * sizeStep.y;
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
      shape.lineTo(lineIndex * width, leafMidPoint * length);
      shape.lineTo(0, length);
      shape.lineTo(-lineIndex * width, leafMidPoint * length);
      shape.lineTo(0, 0);

      // use the shape to create a geometry
      shapeGeometry = new ShapeGeometry(shape);

      shapeGeometry.rotateX(rotationStep.x * ratio);
      shapeGeometry.rotateY(rotationStep.y * ratio);
      shapeGeometry.rotateZ(rotationStep.z * ratio);

      shapeGeometry.translate(pos.x, -pos.z, pos.y);
      shapeGeometry.rotateX(-Math.PI / 2);

      // offset z vector components based on the two splines
      // for (j = 0; j < shapeGeometry.vertices.length; j++) {
      //   var v = shapeGeometry.vertices[j];
      //   var ux = _Math.clamp(
      //     _Math.mapLinear(v.x, -size, size, 0.0, 1.0),
      //     0.0,
      //     1.0
      //   );
      //   var uy = _Math.clamp(
      //     _Math.mapLinear(v.y, -size, size, 0.0, 1.0),
      //     0.0,
      //     1.0
      //   );

      //   v.z += splineX.getPointAt(ux).z;
      //   v.z += splineY.getPointAt(uy).z;
      // }

      // merge into the whole
      geometry.merge(shapeGeometry);
    }

    // geometry.center();

    // 5. feed the geometry to the animation
    const leafAnimation = new LeafAnimation(geometry);

    return leafAnimation;
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

  setHeight(height) {
    this.setState({ height }, isDirty => {
      isDirty && this.init();
    });
  }

  setOffset(offset) {
    this.setState({ offset }, isDirty => {
      isDirty && this.init();
    });
  }

  setDisplacement(displacement) {
    this.setState({ displacement }, isDirty => {
      isDirty && this.init();
    });
  }

  setAnimated(animated) {
    this.setState({ animated }, isDirty => {
      isDirty && this.init();
    });
  }

  setLeafCount(leafCount) {
    this.setState({ leafCount }, isDirty => {
      isDirty && this.init();
    });
  }

  setThickness(thickness) {
    this.setState({ thickness }, isDirty => {
      isDirty && this.init();
    });
  }

  setPointCount(pointCount) {
    this.setState({ pointCount }, isDirty => {
      isDirty && this.init();
    });
  }

  setLeafStartPoint(leafStartPoint) {
    this.setState({ leafStartPoint }, isDirty => {
      isDirty && this.init();
    });
  }

  setLeafEndPoint(leafEndPoint) {
    this.setState({ leafEndPoint }, isDirty => {
      isDirty && this.init();
    });
  }

  setRotationStep(rotationStep) {
    this.setState({ rotationStep }, isDirty => {
      isDirty && this.init();
    });
  }

  setSizeStep(sizeStep) {
    this.setState({ sizeStep }, isDirty => {
      isDirty && this.init();
    });
  }

  clean() {
    if (this.stem) {
      this.group.remove(this.stem.curvePainter.mesh);
      this.geometry.dispose();
      this.stem.curvePainter.clean();
      this.stem = undefined;
    }

    if (this.leaves) {
      for (let i = 0, iL = this.leaves.length, leaf; i < iL; i++) {
        leaf = this.leaves[i];
        this.group.remove(leaf.group);
        leaf.clean();
      }
    }
    this.leaves = [];

    if (this.leavesMesh) {
      this.group.remove(this.leavesMesh);
      this.leavesMesh.geometry.dispose();
      this.leavesMesh.material.dispose();
      this.leavesMesh = undefined;
    }
  }

  render() {}

  update() {
    this.leavesMesh.material.uniforms.time.value = this.currentTime;
  }
}

export default SolomonsSeal;
