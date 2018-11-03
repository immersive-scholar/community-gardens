const LookUpOffset = R => {
  const x = R.floatBetween(-0.1, 0.1);
  const y = R.floatBetween(-0.2, 0);
  const z = R.floatBetween(-0.1, 0);
  return {
    x,
    y,
    z,
    tx: -x,
    ty: -y,
    tz: -z
  };
};

const LookDownOffset = R => {
  const x = R.floatBetween(-0.25, 0.25);
  const y = R.floatBetween(0, 0.25);
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
