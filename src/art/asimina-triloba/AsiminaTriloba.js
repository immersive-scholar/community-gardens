import { Vector2, Vector3 } from "three-full";
import ColorFactory from "util/ColorFactory";
import BasePlant from "art/common/BasePlant";

// import AsiminaTrilobaPetal from "./AsiminaTrilobaPetal";
import AsiminaTrilobaPetalShape from "./AsiminaTrilobaPetalShape";
import Petals from "./Petals";
import Pollen from "./Pollen";
import TextureFactory from "util/TextureFactory";
import StemGeometry from "./StemGeometry";

class AsiminaTriloba extends BasePlant {
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
      height = this.R.floatBetween(0.25, 0.75),
      pointCount = 24,
      displacement = new Vector3(0.2, 0.1, 0.2),
      scale = new Vector3(2, 2, 4),
      offset = new Vector3(
        this.R.floatBetween(-0.5, 0.5),
        this.R.floatBetween(-0.5, 0.5),
        this.R.floatBetween(-0.5, 0.5)
      ),
      thickness = 0.02,
      color = ColorFactory.getRandomColor(),
      petalColor = color,
      petalCount = this.R.intBetween(6, 12),
      petalWidth = 0.05,
      petalLength = 0.1,
      petalMidPointRatio = 0.6,
      petalLowerMidPointRatio = 0.2,
      petalUpperMidPointRatio = 0.9,
      petalDistanceFromCenter = 0.01,
      imagePath = TextureFactory.getStroke(),
      // imagePath = TextureFactory.getPattern(),
      textureSize = new Vector2(15, 15),
      animated = true,
      delay = 0,
      openness = 0.3,
      hslBase = new Vector3(this.R.floatBetween(0.5, 1.0), 0.6, 0.3),
      hslRange = new Vector3(0.12, 0.12, 0.2),
      windForce = 0,
      windDirection = new Vector3(0, 0, 0),
      rotationAxis = new Vector3(0, 0, 0.4),
      rotationAngle = 0.4,
      petalRotation = this.R.intBetween(360, 720),
      translateToY = 0,
      berrySize = 0.025,
      berryCount = 1,
      // berryColor = 0xffffff,
      berryColor = color,
      berryDisplacement = new Vector2(0.01, 0.01),
      berryDistanceFromStem = 0.002,
      berryRotation = 360,
      berrySpiral = true,
      berrySpiralDepth = 0.1,
      wireframe = !true
    } = this.state;

    const stemProps = {
      height,
      thickness,
      color,
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

    //get top point
    const stemTopPoint = this.stem.geometry.vertices[0];
    // const stemTopPoint = new Vector3(0, 0, 0);

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
      color: petalColor,
      imagePath,
      wireframe,
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
    this.petals.rotation.z = Math.PI / 2;
    this.group.add(this.petals);

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

    this.focalPoint = this.pollen;
  };

  animateIn = ({ duration = 2, delay = 0, animated = true } = {}) => {
    this.state.lazy = false;
    this.state.visible = true;
    this.state.duration = duration;
    this.state.delay = delay;
    this.state.animated = animated;

    this.stem.curvePainter.animateIn({ duration, delay, animated });
    this.petals.animateIn({ duration, delay: delay + 1, animated });
    this.pollen.animateIn({ duration, delay: delay + 2, animated });
  };
}

export default AsiminaTriloba;
