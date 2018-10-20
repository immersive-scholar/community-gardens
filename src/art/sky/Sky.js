import { Vector3, CatmullRomCurve3 } from "three-full";
import { TweenMax, Power2 } from "gsap";
import CurvePainter from "three/helpers/CurvePainter";
import ColorSampler from "util/ColorSampler";
import BaseRenderable from "art/common/BaseRenderable";

import SkyGeometry from "./SkyGeometry";

class Sky extends BaseRenderable {
  constructor(props, camera, R) {
    super(props, camera, R);

    this.init(props);
  }

  init = (props = {}) => {
    this.leaves = [];

    this.setState(props);

    this.clean();

    const {
      width = 100,
      imagePath = "img/strokes/wax-and-oil-1.png",
      displacement = new Vector3(0.2, 0.1, 0.2),
      scale = new Vector3(2, 2, 4),
      offset = new Vector3(
        this.R.floatBetween(-0.5, 0.5),
        this.R.floatBetween(-0.5, 0.5),
        this.R.floatBetween(-0.5, 0.5)
      ),
      animated = true,
      pointCount = width * 25,
      thickness = 15,
      color = ColorSampler.getRandomColor(),
      delay = 0
    } = this.state;

    // sky
    this.geometry = new SkyGeometry({
      width,
      pointCount,
      displacement,
      scale,
      offset,
      R: this.R
    });

    this.skyMesh = this.toCurve({
      geometry: this.geometry,
      color,
      imagePath,
      delay,
      pointCount,
      thickness,
      fogDensity: 0.003,
      animated
    });
    // this.skyMesh.curvePainter.mesh.frustumCulled = false;
    this.skyMesh.curvePainter.mesh.position.z = 10;
    this.group.add(this.skyMesh.curvePainter.mesh);

    this.tween && this.tween.kill(null, this);
    if (animated) {
      this.currentTime = 0;
      this.animate({ delay });
    } else {
      this.currentTime = 1;
    }
  };

  toCurve = ({
    geometry,
    color,
    imagePath,
    delay = 0,
    thickness,
    pointCount,
    fogColor,
    fogDensity,
    animated
  }) => {
    const curve = new CatmullRomCurve3(geometry.vertices, false, "catmullrom");

    const curvePainter = new CurvePainter({
      camera: this.camera,
      curve,
      color,
      imagePath,
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

  setWidth(width) {
    this.setState({ width }, isDirty => {
      isDirty && this.init();
    });
  }

  setOffset(offset) {
    this.setState({ offset }, isDirty => {
      isDirty && this.init();
    });
  }

  setDisplacement(displacement) {
    console.log("displacement ", displacement);
    this.setState({ displacement }, isDirty => {
      isDirty && this.init();
    });
  }

  setAnimated(animated) {
    this.setState({ animated }, isDirty => {
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

    if (this.skyMesh) {
      this.group.remove(this.skyMesh);
      this.skyMesh.geometry.dispose();
      this.skyMesh.material.dispose();
      this.skyMesh = undefined;
    }
  }

  animate({ delay }) {
    this.tween && this.tween.kill(null, this);
    this.tween = TweenMax.to(this, 3, {
      currentTime: 1,
      onUpdate: () => {
        this.update();
      },
      ease: Power2.easeOut,
      delay: delay + 0.5
    });
  }

  render() {}

  update() {
    this.skyMesh.curvePainter.mesh.material.uniforms.revealProgress.value = this.currentTime;
  }
}

export default Sky;
