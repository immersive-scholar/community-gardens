import { Vector3 } from "three-full";

const PlantModelToSolomonsSealProps = ({
  model,
  i,
  delay = 0,
  instanceDelay = 0.5,
  R
}) => {
  const props = {
    lazy: true,
    delay: delay + i * instanceDelay,
    leafCount: R.intBetween(12, 24),
    // windForce: R.floatBetween(0, 0.5),
    // windDirection: new Vector3(
    //   R.floatBetween(-0.5, 0.5),
    //   0,
    //   R.floatBetween(-0.5, 0.5)
    // ),
    hslBase: new Vector3(1, R.floatBetween(0, 0.5), R.floatBetween(0, 0.5)),
    hslRange: new Vector3(
      R.floatBetween(0, 0.2),
      R.floatBetween(0.2, 0.4),
      R.floatBetween(0.2, 0.5)
    ),
    berryCount: R.intBetween(24, 96),
    berryDistanceFromStem: R.floatBetween(0.015, 0.05)
    // berryDisplacement: new Vector2(
    //   R.floatBetween(-0.4, 0.4),
    //   R.floatBetween(-0.4, 0.4)
    // )
    // offset: new Vector3(x * 0.02, (x + y) * 0.02, y * 0.02)
  };

  return props;
};

export default PlantModelToSolomonsSealProps;
