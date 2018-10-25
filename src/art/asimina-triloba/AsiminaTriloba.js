import { Vector2, Vector3, CatmullRomCurve3 } from "three-full";
import { TweenMax, Power2 } from "gsap";
import ColorFactory from "util/ColorFactory";
import BaseRenderable from "art/common/BaseRenderable";

// import AsiminaTrilobaPetal from "./AsiminaTrilobaPetal";
import AsiminaTrilobaPetalShape from "./AsiminaTrilobaPetalShape";
import Petals from "./Petals";
import Pollen from "./Pollen";
import TextureFactory from "util/TextureFactory";
import StemGeometry from "./StemGeometry";
import CurvePainter from "three/helpers/CurvePainter";

class AsiminaTriloba extends BaseRenderable {
  constructor(props, camera, R) {
    super(props, camera, R);

    this.init(props);
  }

  init = (props = {}) => {
    this.setState(props);

    this.clean();

    const {
      height = this.R.floatBetween(0.25, 0.75),
      pointCount = 24,
      color = ColorFactory.getRandomColor(),
      displacement = new Vector3(0.2, 0.1, 0.2),
      scale = new Vector3(2, 2, 4),
      offset = new Vector3(
        this.R.floatBetween(-0.5, 0.5),
        this.R.floatBetween(-0.5, 0.5),
        this.R.floatBetween(-0.5, 0.5)
      ),
      thickness = 0.02,
      petalCount = this.R.intBetween(6, 12),
      petalWidth = 0.25,
      petalLength = 0.15,
      petalMidPointRatio = 0.6,
      petalLowerMidPointRatio = 0.2,
      petalUpperMidPointRatio = 0.9,
      petalDistanceFromCenter = 0.01,
      // imagePath = TextureFactory.getPattern(),
      imagePath = "/img/strokes/ddw-watercolor-1.png",
      textureSize = new Vector2(5, 5),
      animated = true,
      delay = 0,
      openness = 0.3,
      petalTarget = new Vector3(0, 2, 0),
      hslBase = new Vector3(this.R.floatBetween(0.5, 1.0), 0.6, 0.3),
      hslRange = new Vector3(0.12, 0.12, 0.2),
      windForce = 0,
      windDirection = new Vector3(0, 0, 0),
      rotationAxis = new Vector3(0, 0, 0.4),
      rotationAngle = 0.4,
      petalRotation = 720,
      translateToY = 0,
      berrySize = 0.025,
      berryCount = 1,
      // berryColor = 0xffffff,
      berryColor = color,
      berryDisplacement = new Vector2(0.01, 0.01),
      berryDistanceFromStem = 0.002,
      berryRotation = 360,
      berrySpiral = true,
      berrySpiralDepth = 0.1
    } = this.state;

    // stem
    this.geometry = new StemGeometry({
      height,
      pointCount,
      displacement,
      scale,
      offset,
      R: this.R
    });

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

    //get top point
    const stemTopPoint = this.stem.geometry.vertices[0];

    const petalShapeGeometry = new AsiminaTrilobaPetalShape({
      width: petalWidth,
      length: petalLength,
      petalMidPointRatio,
      petalLowerMidPointRatio,
      petalUpperMidPointRatio
    });

    this.petals = new Petals({
      petalCount,
      rotation: petalRotation,
      petalShapeGeometry: petalShapeGeometry.clone(),
      width: petalWidth,
      length: petalLength,
      color,
      imagePath,
      textureSize,
      distanceFromCenter: petalDistanceFromCenter,
      R: this.R,
      hslBase,
      hslRange,
      animated,
      delay,
      openness,
      windForce,
      windDirection,
      rotationAxis,
      rotationAngle,
      translateToY
    });
    this.petals.position.copy(stemTopPoint);
    // this.petals.lookAt(petalTarget);
    this.petals.rotation.z = Math.PI / 2;
    this.group.add(this.petals);
    window.mesh = this.petals;

    // pollen
    this.pollen = new Pollen({
      size: berrySize,
      count: berryCount,
      displacement: berryDisplacement,
      distanceFromCenter: berryDistanceFromStem,
      rotation: berryRotation,
      spiral: berrySpiral,
      spiralDepth: berrySpiralDepth,
      // color,
      color: berryColor,
      R: this.R,
      animated,
      windForce,
      windDirection,
      delay: 0
    });
    this.pollen.position.copy(stemTopPoint);
    // this.pollen.rotation.y = -Math.PI / 2;
    this.group.add(this.pollen);

    this.tween && this.tween.kill(null, this);
    if (animated) {
      this.currentTime = 0;
      this.animatePetals({ delay });
    } else {
      this.currentTime = 1;
    }
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
    this.pollen.material.uniforms.uTime.value = this.currentTime;
  }
}

export default AsiminaTriloba;
