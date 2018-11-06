const EnergyOutgoingModifier = ({ props, energyOutgoing }) => {
  // If energy outgoing is high, the berries are displaced further from the stem
  if (energyOutgoing > 0) {
    props.berryDistanceFromStem += energyOutgoing * 0.04;
    props.petalDistanceFromCenter += energyOutgoing * 0.04;
  }

  return props;
};

export default EnergyOutgoingModifier;
