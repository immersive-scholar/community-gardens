const slideIn = {};

slideIn.default = ({ duration, delay, blockable }) => ({
  transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
  transitionDelay: `${delay}ms`,
  opacity: 0,
  transform: 'translateX(-25px)',
  display: `${blockable ? 'none' : 'block'}`,
});

slideIn.entering = () => ({
  opacity: 0,
  display: 'block',
});

slideIn.entered = () => ({
  opacity: 1,
  display: 'block',
  transform: 'translateX(0px)',
});

slideIn.exiting = () => ({
  opacity: 0,
  display: 'block',
  transform: 'translateX(25px)',
});

slideIn.exited = ({ blockable }) => ({
  display: `${blockable ? 'none' : 'block'}`,
});

export default slideIn;
