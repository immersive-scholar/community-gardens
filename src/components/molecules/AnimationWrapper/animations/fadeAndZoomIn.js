const fadeAndZoomIn = {};

fadeAndZoomIn.default = ({ duration, delay, blockable }) => ({
  transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
  transitionDelay: `${delay}ms`,
  opacity: 0,
  transform: 'scale(0)',
  display: `${blockable ? 'none' : 'block'}`,
});

fadeAndZoomIn.entering = () => ({
  opacity: 0,
  display: 'block',
});

fadeAndZoomIn.entered = () => ({
  opacity: 1,
  display: 'block',
  transform: 'scale(1)',
});

fadeAndZoomIn.exiting = () => ({
  opacity: 0,
  display: 'block',
  transitionDelay: 0,
  transform: 'scale(0)',
});

fadeAndZoomIn.exited = ({ blockable }) => ({
  display: `${blockable ? 'none' : 'block'}`,
});

export default fadeAndZoomIn;
