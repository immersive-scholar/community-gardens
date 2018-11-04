import { Vector2, Vector3 } from "three-full";
import ColorFactory from "util/ColorFactory";
import BasePlant from "art/common/BasePlant";

import StellariaPuberaPetalShape from "./StellariaPuberaPetalShape";
import StemGeometry from "art/solomons-seal/StemGeometry";
import Petals from "./Petals";
import Pollen from "./Pollen";
import TextureFactory from "../../util/TextureFactory";

class StellariaPubera extends BasePlant {
  constructor(props, camera, R) {
    super(props, camera, R);

    this.setState(props);

    if (!props.lazy) {
      this.init(props);
      this.createChildren();
    }
  }

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

    const {
      height = this.R.floatBetween(0.25, 1.5),
      color = ColorFactory.getRandomColor(),
      rearPetalColor = color,
      petalCount = this.R.intBetween(10, 24),
      rearPetalCount = 6,
      petalWidth = 0.025,
      petalLength = 0.25,
      petalMidPointRatio = 0.5,
      petalLowerMidPointRatio = 0.2,
      petalUpperMidPointRatio = 0.8,
      petalDistanceFromCenter = 0,
      imagePath = TextureFactory.getPattern(),
      textureSize = new Vector2(15, 15),
      animated = true,
      delay = 0,
      openness = 0.3,
      petalTarget = new Vector3(0, 1, -1),
      hslBase = new Vector3(this.R.floatBetween(0.5, 1.0), 0.6, 0.3),
      hslRange = new Vector3(0.12, 0.12, 0.2),
      windForce = 0,
      windDirection = new Vector3(0, 0, 0),
      rotationAxis = new Vector3(0, 0, Math.PI),
      rotationAngle = 0.4,
      translateToY = 0,
      berrySize = 0.0025,
      berryCount = 24, //this.R.intBetween(4, 24),
      // berryColor = 0xffffff,
      berryColor = color,
      berryWireframe = false,
      berryDisplacement = new Vector2(0.01, 0.01),
      berryDistanceFromStem = 0.002,
      berryRotation = 360,
      berrySpiral = true,
      berrySpiralDepth = 0.1,
      thickness = 0.02,
      pointCount = height * 25,
      displacement = new Vector3(0.2, 0.1, 0.2),
      scale = new Vector3(2, 2, 4),
      offset = new Vector3(
        this.R.floatBetween(-0.5, 0.5),
        this.R.floatBetween(-0.5, 0.5),
        this.R.floatBetween(-0.5, 0.5)
      )
    } = this.state;

    const stemProps = {
      height,
      color,
      thickness,
      pointCount,
      scale,
      displacement,
      offset,
      R: this.R,
      glitchAmplitude: 0,
      glitchAngle: new Vector3(1, 1, 1),
      glitchThreshold: new Vector3(1, 1, 1),
      fogDensity: 0.3,
      animated
    };
    const geometry = new StemGeometry(stemProps);
    stemProps.geometry = geometry;
    this.createStem(stemProps);

    const stemTopPoint = this.stem.geometry.vertices[0];

    const petalShapeGeometry = new StellariaPuberaPetalShape({
      width: petalWidth,
      length: petalLength,
      petalMidPointRatio,
      petalLowerMidPointRatio,
      petalUpperMidPointRatio
    });

    this.petals = new Petals({
      petalCount,
      petalShapeGeometry: petalShapeGeometry.clone(),
      color: 0xffffff,
      imagePath,
      textureSize,
      distanceFromCenter: petalDistanceFromCenter,
      R: this.R,
      hslBase: new Vector3(0.5, 0.5, 1),
      hslRange: new Vector3(0, 0.1, 0.1),
      animated,
      delay,
      openness,
      windForce,
      windDirection,
      rotationAxis,
      rotationAngle,
      translateToY
    });
    // this.petals.position.y = height;
    this.petals.position.copy(stemTopPoint);
    this.petals.lookAt(petalTarget);
    // this.petals.rotation.y = -Math.PI / 2;
    this.group.add(this.petals);

    const rearPetalShapeGeometry = new StellariaPuberaPetalShape({
      width: petalWidth * 2.5,
      length: petalLength * 0.5,
      petalMidPointRatio,
      petalLowerMidPointRatio,
      petalUpperMidPointRatio
    });

    this.rearPetals = new Petals({
      petalCount: rearPetalCount,
      petalShapeGeometry: rearPetalShapeGeometry.clone(),
      petalMidPointRatio: 0.5,
      petalLowerMidPointRatio: 0.2,
      petalUpperMidPointRatio: 0.8,
      color: rearPetalColor,
      imagePath,
      textureSize,
      distanceFromCenter: petalDistanceFromCenter,
      R: this.R,
      hslBase,
      hslRange,
      animated,
      delay: delay,
      openness,
      windForce,
      windDirection,
      rotationAxis,
      rotationAngle,
      translateToY
    });
    // this.rearPetals.position.y = height;
    this.rearPetals.position.copy(stemTopPoint);
    this.rearPetals.position.z += 0.002;
    this.rearPetals.lookAt(petalTarget);
    // this.rearPetals.rotation.y = -Math.PI / 2;
    this.group.add(this.rearPetals);

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
      wireframe: berryWireframe,
      R: this.R,
      animated,
      windForce,
      windDirection,
      delay: 0
    });
    this.pollen.position.copy(stemTopPoint);
    this.pollen.lookAt(petalTarget);
    this.pollen.position.z -= 0.002;
    // this.pollen.rotation.y = -Math.PI / 2;
    this.group.add(this.pollen);

    this.focalPoint = this.petals;
  };

  animateIn = ({ duration = 1, delay = 0, animated = true } = {}) => {
    this.state.lazy = false;
    this.state.visible = true;
    this.state.duration = duration;
    this.state.delay = delay;
    this.state.animated = animated;

    this.stem.curvePainter.animateIn({ duration, delay, animated });
    this.rearPetals.animateIn({ duration, delay: delay + 2, animated });
    this.petals.animateIn({ duration, delay: delay + 2.5, animated });
    this.pollen.animateIn({ duration, delay: delay + 3, animated });
  };
}

export default StellariaPubera;
