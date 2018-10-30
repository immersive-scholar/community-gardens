const LookUpOffset = R => {
  const x = R.floatBetween(-0.25, 0.25);
  const y = -0.2; //R.floatBetween(-0.2, 0);
  const z = -0.25; //R.floatBetween(-0.25, 0);
  return {
    x,
    y,
    z,
    tx: -x,
    ty: -y,
    tz: -z
  };
};

export { LookUpOffset };
