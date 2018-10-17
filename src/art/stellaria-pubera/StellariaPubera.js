import { Vector2, Vector3 } from "three-full";
import { TweenMax, Power2 } from "gsap";
import ColorSampler from "util/ColorSampler";
import BaseRenderable from "art/common/BaseRenderable";

// import StellariaPuberaPetal from "./StellariaPuberaPetal";
import Petals from "./Petals";

class StellariaPubera extends BaseRenderable {
  constructor(props, camera, R) {
    super(props, camera, R);

    this.init(props);
  }

  init = (props = {}) => {
    this.setState(props);

    this.clean();

    const {
      height = 0.25,
      color = 0xffffff,
      petalColor = color,
      rearPetalColor = new ColorSampler().getRandomColor(),
      petalCount = 10, //this.R.intBetween(10, 24),
      petalWidth = 0.0125,
      petalLength = 0.125,
      petalDistanceFromCenter = 0.015,
      imagePath = "/img/patterns/diamonds-2.png",
      textureSize = new Vector2(5, 5),
      animated = true,
      delay = 0,
      openness = 0.3,
      petalTarget = new Vector3(0, -10, 0),
      hslBase = new Vector3(this.R.floatBetween(0.5, 1.0), 0.5, 0.93),
      hslRange = new Vector3(0, 0, 0.2),
      windForce = 0,
      windDirection = new Vector3(0, 0, 0)
    } = this.state;

    // stem
    // this.geometry = new StemGeometry({
    //   height,
    //   pointCount,
    //   displacement,
    //   scale,
    //   offset,
    //   R: this.R
    // });

    // this.stem = this.toCurve({
    //   geometry: this.geometry,
    //   color,
    //   delay,
    //   pointCount,
    //   thickness,
    //   fogDensity: 0.3,
    //   animated
    // });
    // this.group.add(this.stem.curvePainter.mesh);

    this.petals = new Petals({
      petalCount,
      width: petalWidth,
      length: petalLength,
      color: petalColor,
      imagePath,
      textureSize,
      petalDistanceFromCenter,
      R: this.R,
      hslBase: new Vector3(1, 1, 0.8),
      hslRange: new Vector3(0, 0, 0.2),
      animated,
      delay,
      openness,
      windForce,
      windDirection
    });
    this.petals.position.y = height;
    this.petals.lookAt(petalTarget);
    this.group.add(this.petals);

    // this.rearPetals = new Petals({
    //   petalCount: petalCount >> 1,
    //   width: petalWidth * 0.7,
    //   length: petalLength,
    //   color: rearPetalColor,
    //   imagePath,
    //   textureSize,
    //   petalDistanceFromCenter: 0,
    //   R: this.R,
    //   hslBase,
    //   hslRange,
    //   animated,
    //   delay,
    //   openness,
    //   windForce,
    //   windDirection
    // });
    // this.rearPetals.position.y = height - 0.02;
    // this.rearPetals.lookAt(petalTarget);
    // this.rearPetals.renderOrder = -1;
    // this.group.add(this.rearPetals);

    this.tween && this.tween.kill(null, this);
    if (animated) {
      this.currentTime = 0;
      this.berryTime = 0;
      this.animatePetals({ delay });
    } else {
      this.currentTime = 1;
      this.berryTime = 1;
    }
  };

  //   toCurve = ({
  //     geometry,
  //     color,
  //     delay = 0,
  //     thickness = 2,
  //     pointCount = 8,
  //     fogColor,
  //     fogDensity,
  //     animated
  //   }) => {
  //     const curve = new CatmullRomCurve3(geometry.vertices, false, "catmullrom");

  //     const curvePainter = new CurvePainter({
  //       camera: this.camera,
  //       curve,
  //       color,
  //       pointCount,
  //       lineWidth: thickness,
  //       delay: delay,
  //       fogColor,
  //       fogDensity,
  //       animated
  //     });

  //     curvePainter.mesh.matrixAutoUpdate = true;

  //     return { curvePainter, geometry, curve };
  //   };

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

  setPetalTarget(petalTarget) {
    this.setState({ petalTarget }, isDirty => {
      isDirty && this.init();
    });
  }

  setPetalCount(petalCount) {
    this.setState({ petalCount }, isDirty => {
      isDirty && this.init();
    });
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

  setProps(props) {
    for (let prop in props) {
      this.setState({ prop: props[prop] }, isDirty => {
        isDirty && this.init();
      });
    }
  }

  clean() {
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

    if (this.rearPetals) {
      this.group.remove(this.rearPetals);
      this.rearPetals.clean();
      this.rearPetals = undefined;
    }

    if (this.pollenMesh) {
      this.group.remove(this.pollenMesh);
      this.pollenMesh.geometry.dispose();
      this.pollenMesh.material.dispose();
      this.pollenMesh = undefined;
    }
  }

  animatePetals({ delay }) {
    this.tween && this.tween.kill(null, this);
    this.tween = TweenMax.to(this, 4, {
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

  render() {}

  update() {
    this.petals.material.uniforms.uTime.value = this.currentTime;
    // this.rearPetals.material.uniforms.uTime.value = this.currentTime;
  }
}

export default StellariaPubera;
