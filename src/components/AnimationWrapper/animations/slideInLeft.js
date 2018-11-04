const slideInLeft = {};

slideInLeft.default = ({ duration, delay, blockable }) => ({
  transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
  transitionDelay: `${delay}ms`,
  opacity: 0,
  transform: 'translateX(-25px)',
  display: `${blockable ? 'none' : 'block'}`,
});

slideInLeft.entering = () => ({
  opacity: 0,
  display: 'block',
});

slideInLeft.entered = () => ({
  opacity: 1,
  display: 'block',
  transform: 'translateX(0px)',
});

slideInLeft.exiting = () => ({
  opacity: 0,
  display: 'block',
  transform: 'translateX(25px)',
});

slideInLeft.exited = ({ blockable }) => ({
  display: `${blockable ? 'none' : 'block'}`,
});

export default slideInLeft;
