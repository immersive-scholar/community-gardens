const LookUpOffset = R => {
  const x = R.floatBetween(-0.01, 0.01);
  const y = R.floatBetween(-0.02, 0);
  const z = 0; //R.floatBetween(-0.1, 0);
  return {
    x,
    y,
    z,
    tx: -x,
    ty: 0,
    tz: -z
  };
};

const LookDownOffset = R => {
  const x = R.floatBetween(-0.025, 0.025);
  const y = R.floatBetween(0, 0.025);
  const z = 0;
  return {
    x,
    y,
    z,
    tx: -x,
    ty: 0,
    tz: -z
  };
};

export { LookUpOffset, LookDownOffset };
