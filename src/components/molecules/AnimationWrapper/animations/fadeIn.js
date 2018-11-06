const fadeIn = {};

fadeIn.default = ({ duration, delay, blockable }) => ({
  transition: `opacity ${duration}ms ease-out`,
  transitionDelay: `${delay}ms`,
  opacity: 0,
  display: `${blockable ? 'none' : 'block'}`,
});

fadeIn.entering = () => ({
  opacity: 0,
  display: 'block',
});

fadeIn.entered = () => ({
  opacity: 1,
  display: 'block',
});

fadeIn.exiting = () => ({
  opacity: 0,
  transitionDelay: 0,
  display: 'block',
});

fadeIn.exited = ({ blockable }) => ({
  display: `${blockable ? 'none' : 'block'}`,
});

export default fadeIn;
