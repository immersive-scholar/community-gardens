import { Vector2, Vector3, CatmullRomCurve3 } from "three-full";
import { TweenMax, Power2 } from "gsap";
// import BendModifier from "three/modifiers/BendModifier";
import CurvePainter from "three/helpers/CurvePainter";
import ColorSampler from "util/ColorSampler";
import BaseRenderable from "art/common/BaseRenderable";

import SolomonsSealLeaf from "./SolomonsSealLeaf";
import StemGeometry from "./StemGeometry";
import LeavesBAS from "./LeavesBAS";

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
      offset = new Vector3(
        this.R.floatBetween(-0.5, 0.5),
        this.R.floatBetween(-0.5, 0.5),
        this.R.floatBetween(-0.5, 0.5)
      ),
      animated = true,
      leafCount = 10,
      pointCount = height * 25,
      thickness = 0.02,
      color = new ColorSampler().getRandomColor(),
      delay = 0,
      leafStartPoint = 0.3,
      leafEndPoint = 1,
      rotationStart = new Vector3(0, 0, 0),
      rotationEnd = new Vector3(-1.5, 0.7, 0.2),
      sizeStart = new Vector2(0.02, 0.01),
      sizeEnd = new Vector2(0.1, 0.05)
    } = this.state;

    // stem
    this.geometry = new StemGeometry({
      height,
      pointCount,
      displacement,
      scale,
      offset
    });

    // geometry.vertices = this.bendGeometry({ geometry, R });

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

    this.leavesMesh = new LeavesBAS({
      leafCount,
      size: 0.1,
      centerX: 0,
      centerY: 0,
      mesh: this.stem,
      color,
      pointCount: pointCount * 3,
      leafStartPoint,
      leafEndPoint,
      sizeStart,
      sizeEnd,
      rotationStart,
      rotationEnd,
      leafMidPoint: 0.4,
      R: this.R,
      animated
    });
    this.group.add(this.leavesMesh);

    this.tween && this.tween.kill(null, this);
    if (animated) {
      this.currentTime = 0;
      this.animateLeaves({ delay });
    } else {
      this.currentTime = 1;
    }
  };

  // bendGeometry = ({ geometry, R }) => {
  //   var direction = new Vector3(0, 0, -this.R.random());
  //   var axis = new Vector3(this.R.random(), this.R.random(), 0);
  //   var angle = (Math.PI / 2) * this.R.floatBetween(0.5, 0.7);

  //   var bend = new BendModifier().set(direction, axis, angle);
  //   bend.modify(geometry);

  //   return geometry.vertices;
  // };

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
    sizeStart,
    sizeEnd,
    rotationStart,
    rotationEnd
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
      // length = (1 - ratio) * sizeStep.x;
      // width = (1 - ratio) * sizeStep.y;
      length = sizeStart.x + (sizeEnd.x - sizeStart.x) * ratio;
      width = sizeStart.y + (sizeEnd.y - sizeStart.y) * ratio;
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
      // leaf.group.rotation.x = rotationStep.x * ratio;
      // leaf.group.rotation.y = rotationStep.y * ratio;
      // leaf.group.rotation.z = rotationStep.z * ratio;

      this.group.add(leaf.group);
      leaves.push(leaf);
    }
    return leaves;
  }

  animateLeaves({ delay }) {
    this.tween && this.tween.kill(null, this);
    this.tween = TweenMax.to(this, 2, {
      currentTime: 1,
      onUpdate: () => {
        this.update();
      },
      ease: Power2.easeOut,
      delay: delay + 0.5
      // yoyo: true,
      // repeat: -1
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

  setRotationStart(rotationStart) {
    this.setState({ rotationStart }, isDirty => {
      isDirty && this.init();
    });
  }

  setRotationEnd(rotationEnd) {
    this.setState({ rotationEnd }, isDirty => {
      isDirty && this.init();
    });
  }

  setSizeStart(sizeStart) {
    this.setState({ sizeStart }, isDirty => {
      isDirty && this.init();
    });
  }

  setSizeEnd(sizeEnd) {
    this.setState({ sizeEnd }, isDirty => {
      isDirty && this.init();
    });
  }

  setColor(color) {
    this.setState({ color }, isDirty => {
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
    this.leavesMesh.material.uniforms.uTime.value = this.currentTime;
  }
}

export default SolomonsSeal;
