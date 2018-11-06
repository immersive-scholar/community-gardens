const simpleBlock = {};

simpleBlock.default = ({ duration, delay, blockable }) => ({
  display: `${blockable ? 'none' : 'block'}`,
});

simpleBlock.entering = () => ({
  display: 'block',
});

simpleBlock.entered = () => ({
  display: 'block',
});

simpleBlock.exiting = () => ({
  display: 'block',
});

simpleBlock.exited = ({ blockable }) => ({
  display: `${blockable ? 'none' : 'block'}`,
});

export default simpleBlock;
