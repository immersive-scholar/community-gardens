import { Vector2, Vector3 } from "three-full";
import ColorFactory from "util/ColorFactory";
import BasePlant from "art/common/BasePlant";

import Leaves from "./Leaves";
import Berries from "./Berries";
import StemGeometry from "./StemGeometry";
import TextureFactory from "../../util/TextureFactory";

class SolomonsSeal extends BasePlant {
  createChildren = () => {
    this.clean();

    const {
      height = this.R.floatBetween(0.5, 2),
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
      color = ColorFactory.getRandomColor(),
      // imagePath = TextureFactory.getStroke(),
      leafStartPoint = 0.3,
      leafEndPoint = 1,
      rotationStart = new Vector3(0, 0, 0),
      rotationEnd = new Vector3(-1.5, 0.7, 0.2),
      sizeStart = new Vector2(0.05, 0.02),
      sizeEnd = new Vector2(0.2, 0.1),
      windForce = 0,
      windDirection = new Vector3(0, 0, 0),
      hslBase = new Vector3(this.R.floatBetween(0.5, 1.0), 1, 0.3),
      hslRange = new Vector3(0, 0, 0.2),
      berrySize = 0.005,
      berryCount = 24, //this.R.intBetween(4, 24),
      berryColor = 0xffffff,
      // berryColor = color,
      berryDisplacement = new Vector2(0.01, 0.01),
      berryDistanceFromStem = 0.015,
      berryRotation = 720,
      berrySpiral = true
      // glitchAmplitude = 0,
      // glitchAngle = new Vector3(1, 1, 1),
      // glitchThreshold = new Vector3(1, 1, 1),
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

    this.berriesMesh = new Berries({
      size: berrySize,
      berryCount,
      berryDisplacement,
      berryDistanceFromStem,
      berryRotation,
      berrySpiral,
      // color,
      color: berryColor,
      referenceMesh: this.stem,
      R: this.R,
      animated,
      windForce,
      windDirection
    });
    this.group.add(this.berriesMesh);

    this.leavesMesh = new Leaves({
      leafCount,
      size: 0.1,
      centerX: 0,
      centerY: 0,
      referenceMesh: this.stem,
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
      animated,
      windForce,
      windDirection,
      hslBase,
      hslRange
    });
    this.group.add(this.leavesMesh);
  };

  // bendGeometry = ({ geometry, R }) => {
  //   var direction = new Vector3(0, 0, -this.R.random());
  //   var axis = new Vector3(this.R.random(), this.R.random(), 0);
  //   var angle = (Math.PI / 2) * this.R.floatBetween(0.5, 0.7);

  //   var bend = new BendModifier().set(direction, axis, angle);
  //   bend.modify(geometry);

  //   return geometry.vertices;
  // };

  animateIn = ({ duration = 1, delay = 0, animated = true } = {}) => {
    this.state.lazy = false;
    this.state.visible = true;
    this.state.duration = duration;
    this.state.delay = delay;
    this.state.animated = animated;

    this.stem.curvePainter.animateIn({ duration, delay, animated });
    this.leavesMesh.animateIn({ duration, delay: delay + 0.25, animated });
    this.berriesMesh.animateIn({ duration, delay: delay + 0.5, animated });
  };

  render() {}

  update() {}
}

export default SolomonsSeal;
