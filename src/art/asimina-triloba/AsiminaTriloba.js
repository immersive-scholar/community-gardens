import { Vector2, Vector3, CatmullRomCurve3 } from "three-full";
import ColorFactory from "util/ColorFactory";
import BasePlant from "art/common/BasePlant";

// import AsiminaTrilobaPetal from "./AsiminaTrilobaPetal";
import AsiminaTrilobaPetalShape from "./AsiminaTrilobaPetalShape";
import Petals from "./Petals";
import Pollen from "./Pollen";
import TextureFactory from "util/TextureFactory";
// import StemGeometry from "./StemGeometry";
import CurvePainter from "three/helpers/CurvePainter";

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
      imagePath = TextureFactory.getPattern(),
      textureSize = new Vector2(5, 5),
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
      berrySpiralDepth = 0.1
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

    //get top point
    // const stemTopPoint = this.stem.geometry.vertices[0];
    const stemTopPoint = new Vector3(0, 0, 0);

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
}

export default AsiminaTriloba;