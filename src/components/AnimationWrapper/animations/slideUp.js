const slideUp = {};

slideUp.default = ({ duration, delay, blockable }) => ({
  transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
  transitionDelay: `${delay}ms`,
  opacity: 0,
  transform: 'translateY(25px)',
  display: `${blockable ? 'none' : 'block'}`,
});

slideUp.entering = () => ({
  opacity: 0,
  display: 'block',
});

slideUp.entered = () => ({
  opacity: 1,
  display: 'block',
  transform: 'translateY(0px)',
});

slideUp.exiting = () => ({
  opacity: 0,
  display: 'block',
  transform: 'translateY(-25px)',
  transitionDelay: 0,
});

slideUp.exited = ({ blockable }) => ({
  display: `${blockable ? 'none' : 'block'}`,
});

export default slideUp;
