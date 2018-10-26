const Health = d => {
  const health =
    d.resourcesIncoming -
    d.energyOutgoing +
    d.communityFitness -
    d.personalScarcity +
    d.emotionalHealth;
  return health;
};

export default Health;
