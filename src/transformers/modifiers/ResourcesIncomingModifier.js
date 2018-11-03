const ResourcesIncomingModifier = ({ props, resourcesIncoming }) => {
  // when resources incoming are high, the petals and
  // stem is larger
  if (resourcesIncoming > 1) {
    props.petalLength += resourcesIncoming * 0.025;
    props.petalWidth += resourcesIncoming * 0.025;
    props.thickness += resourcesIncoming * 0.05;
  }

  return props;
};

export default ResourcesIncomingModifier;
