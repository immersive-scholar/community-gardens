const drawerVertical = {};

drawerVertical.default = ({ duration, delay }) => ({
  transition: `transform ${duration}ms ease-out`,
  transitionDelay: `${delay}ms`,
  transform: 'translateY(100%)',
  display: 'none',
});

drawerVertical.entering = () => ({
  display: 'block',
});

drawerVertical.entered = () => ({
  display: 'block',
  transform: 'translateY(0px)',
});

drawerVertical.exiting = () => ({
  display: 'block',
  transform: 'translateY(100%)',
});

drawerVertical.exited = () => ({
  display: 'none',
});

export default drawerVertical;
