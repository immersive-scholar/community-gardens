const slideInRight = {};

slideInRight.default = ({ duration, delay, blockable }) => ({
  transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
  transitionDelay: `${delay}ms`,
  opacity: 0,
  transform: 'translateX(25px)',
  display: `${blockable ? 'none' : 'block'}`,
});

slideInRight.entering = () => ({
  opacity: 0,
  display: 'block',
});

slideInRight.entered = () => ({
  opacity: 1,
  display: 'block',
  transform: 'translateX(0px)',
});

slideInRight.exiting = () => ({
  opacity: 0,
  display: 'block',
  transform: 'translateX(-25px)',
});

slideInRight.exited = ({ blockable }) => ({
  display: `${blockable ? 'none' : 'block'}`,
});

export default slideInRight;
