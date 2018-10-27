import { Vector2, Vector3 } from "three-full";
import ColorFactory from "util/ColorFactory";
import BasePlant from "art/common/BasePlant";

import StellariaPuberaPetalShape from "./StellariaPuberaPetalShape";
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
      height = 0.25,
      color = ColorFactory.getRandomColor(),
      rearPetalColor = color,
      petalCount = 10, //this.R.intBetween(10, 24),
      rearPetalCount = 6,
      petalWidth = 0.025,
      petalLength = 0.25,
      petalMidPointRatio = 0.5,
      petalLowerMidPointRatio = 0.2,
      petalUpperMidPointRatio = 0.8,
      petalDistanceFromCenter = 0,
      imagePath = TextureFactory.getPattern(),
      textureSize = new Vector2(5, 5),
      animated = true,
      delay = 0,
      openness = 0.3,
      petalTarget = new Vector3(0, -10, 0),
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
      berryDisplacement = new Vector2(0.01, 0.01),
      berryDistanceFromStem = 0.002,
      berryRotation = 360,
      berrySpiral = true,
      berrySpiralDepth = 0.1
    } = this.state;

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
      width: petalWidth,
      length: petalLength,
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
    this.petals.position.y = height;
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
      width: petalWidth * 2,
      length: petalLength / 2,
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
    this.rearPetals.position.y = height;
    this.rearPetals.lookAt(petalTarget);
    // this.rearPetals.rotation.y = -Math.PI / 2;
    this.rearPetals.position.z += 0.002;
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
      R: this.R,
      animated,
      windForce,
      windDirection,
      delay: 0
    });
    this.pollen.position.y = height;
    this.pollen.lookAt(petalTarget);
    this.pollen.position.z -= 0.002;
    // this.pollen.rotation.y = -Math.PI / 2;
    this.group.add(this.pollen);
  };

  clean() {
    this.tween && this.tween.kill(null, this);

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

    if (this.pollen) {
      this.group.remove(this.pollen);
      this.pollen.geometry.dispose();
      this.pollen.material.dispose();
      this.pollen = undefined;
    }
  }

  animateIn = ({ duration = 1, delay = 0, animated = true } = {}) => {
    this.state.lazy = false;
    this.state.visible = true;
    this.state.duration = duration;
    this.state.delay = delay;
    this.state.animated = animated;

    this.rearPetals.animateIn({ duration, delay, animated });
    this.petals.animateIn({ duration, delay: delay + 1, animated });
    this.pollen.animateIn({ duration, delay: delay + 4, animated });
  };
}

export default StellariaPubera;
