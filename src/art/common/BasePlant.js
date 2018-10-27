import RandomSeed from "random-seed";

import { CatmullRomCurve3 } from "three-full";
import BaseRenderable from "art/common/BaseRenderable";
import CurvePainter from "three/helpers/CurvePainter";

class BasePlant extends BaseRenderable {
  constructor(props, camera, R) {
    super(props, camera, R);

    this.setState(props);

    if (!props.lazy) {
      this.init(props);
      this.createChildren();
    }
  }

  // boilerplate
  init = (props = {}) => {
    if (!this.state.lazy || this.isDirty) {
      this.createChildren(props);
      if (this.state.visible) {
        this.animateIn(this.state);
      }
    }
  };

  createChildren = () => {
    this.clean();

    // get props out of state, with defaults
    // const {
    //   height = this.R.floatBetween(0.25, 0.75)
    // } = this.state;

    // build objects
    // this.geometry = new StemGeometry({
    //   height,
    // });

    // this.stem = this.toCurve({
    //   geometry: this.geometry,
    // });

    // add to group
    // this.group.add(this.stem.curvePainter.mesh);
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

  setAnimated(animated) {
    this.setState({ animated }, isDirty => {
      isDirty && this.init();
    });
  }

  setDuration(duration) {
    this.setState({ duration }, isDirty => {
      isDirty && this.init();
    });
  }

  setDelay(delay) {
    this.setState({ delay }, isDirty => {
      isDirty && this.init();
    });
  }

  setRandomSeed(randomSeed) {
    this.randomSeed = randomSeed;
    this.R = RandomSeed.create(randomSeed);
    this.setState({ randomSeed }, isDirty => {
      isDirty && this.init();
    });
  }

  setWindForce(windForce) {
    this.setState({ windForce }, isDirty => {
      isDirty && this.init();
    });
  }

  setWindDirection(windDirection) {
    this.setState({ windDirection }, isDirty => {
      isDirty && this.init();
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

  setPetalStartPoint(petalStartPoint) {
    this.setState({ petalStartPoint }, isDirty => {
      isDirty && this.init();
    });
  }

  setPetalEndPoint(petalEndPoint) {
    this.setState({ petalEndPoint }, isDirty => {
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

  setHSLBase(hslBase) {
    this.setState({ hslBase }, isDirty => {
      isDirty && this.init();
    });
  }

  setHSLRange(hslRange) {
    this.setState({ hslRange }, isDirty => {
      isDirty && this.init();
    });
  }

  setGlitchAmplitude(glitchAmplitude) {
    this.setState({ glitchAmplitude }, isDirty => {
      isDirty && this.init();
    });
  }
  setGlitchAngle(glitchAngle) {
    this.setState({ glitchAngle }, isDirty => {
      isDirty && this.init();
    });
  }
  setGlitchThreshold(glitchThreshold) {
    this.setState({ glitchThreshold }, isDirty => {
      isDirty && this.init();
    });
  }

  setBerryCount(berryCount) {
    this.setState({ berryCount }, isDirty => {
      isDirty && this.init();
    });
  }
  setBerrySize(berrySize) {
    this.setState({ berrySize }, isDirty => {
      isDirty && this.init();
    });
  }
  setBerryRotation(berryRotation) {
    this.setState({ berryRotation }, isDirty => {
      isDirty && this.init();
    });
  }
  setBerryColor(berryColor) {
    this.setState({ berryColor }, isDirty => {
      isDirty && this.init();
    });
  }
  setBerryDistanceFromStem(berryDistanceFromStem) {
    this.setState({ berryDistanceFromStem }, isDirty => {
      isDirty && this.init();
    });
  }
  setBerrySpiral(berrySpiral) {
    this.setState({ berrySpiral }, isDirty => {
      isDirty && this.init();
    });
  }

  setOpenness(openness) {
    this.setState({ openness }, isDirty => {
      isDirty && this.init();
    });
  }

  setPetalCount(petalCount) {
    this.setState({ petalCount }, isDirty => {
      isDirty && this.init();
    });
  }

  setLeafCount(leafCount) {
    this.setState({ leafCount }, isDirty => {
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

  setRearPetalCount(rearPetalCount) {
    // this plant does not support rearPetalCount
  }

  setPetalWidth(petalWidth) {
    this.setState({ petalWidth }, isDirty => {
      isDirty && this.init();
    });
  }
  setPetalLength(petalLength) {
    this.setState({ petalLength }, isDirty => {
      isDirty && this.init();
    });
  }
  setPetalDistanceFromCenter(petalDistanceFromCenter) {
    this.setState({ petalDistanceFromCenter }, isDirty => {
      isDirty && this.init();
    });
  }
  setRotationAxis(rotationAxis) {
    this.setState({ rotationAxis }, isDirty => {
      isDirty && this.init();
    });
  }
  setRotationAngle(rotationAngle) {
    this.setState({ rotationAngle }, isDirty => {
      isDirty && this.init();
    });
  }
  setTranslateToY(translateToY) {
    this.setState({ translateToY }, isDirty => {
      isDirty && this.init();
    });
  }

  setPetalRotation(petalRotation) {
    this.setState({ petalRotation }, isDirty => {
      isDirty && this.init();
    });
  }

  setProps(props) {
    for (let prop in props) {
      this.setState({ prop: props[prop] }, isDirty => {
        isDirty && this.init();
      });
    }
  }

  clean() {
    this.tween && this.tween.kill(null, this);

    if (this.stem) {
      this.group.remove(this.stem.curvePainter.mesh);
      this.geometry.dispose();
      this.stem.curvePainter.clean();
      this.stem = undefined;
    }

    if (this.petals) {
      this.group.remove(this.petals);
      this.petals.clean();
      this.petals = undefined;
    }

    if (this.pollen) {
      this.group.remove(this.pollen);
      this.pollen.geometry.dispose();
      this.pollen.material.dispose();
      this.pollen = undefined;
    }
  }

  animateIn = ({ duration = 2, delay = 0, animated = true } = {}) => {
    this.state.lazy = false;
    this.state.visible = true;
    this.state.duration = duration;
    this.state.delay = delay;
    this.state.animated = animated;

    this.petals.animateIn({ duration, delay: delay + 1, animated });
    this.pollen.animateIn({ duration, delay: delay + 2, animated });
  };

  render() {}

  update() {
    // this.petals.material.uniforms.uTime.value = this.currentTime;
    // this.pollen.material.uniforms.uTime.value = this.currentTime;
  }
}

export default BasePlant;
