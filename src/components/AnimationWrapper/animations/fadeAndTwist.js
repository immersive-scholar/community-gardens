const fadeAndTwist = {};

fadeAndTwist.default = ({ duration, delay, blockable }) => ({
  transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
  transitionDelay: `${delay}ms`,
  opacity: 0,
  display: `${blockable ? 'none' : 'block'}`,
});

fadeAndTwist.entering = () => ({
  opacity: 0,
  display: 'block',
  transform: 'rotate(-360deg)',
});

fadeAndTwist.entered = () => ({
  opacity: 1,
  transform: 'rotate(0deg)',
  display: 'block',
});

fadeAndTwist.exiting = () => ({
  display: 'block',
  opacity: 0,
  transitionDelay: 0,
  transform: 'rotate(360deg)',
});

fadeAndTwist.exited = ({ blockable }) => ({
  display: `${blockable ? 'none' : 'block'}`,
});

export default fadeAndTwist;
