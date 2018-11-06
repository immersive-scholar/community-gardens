const drop = {};

drop.default = ({ duration, delay }) => ({
  opacity: 0,
  transition: `transform ${duration}ms cubic-bezier(0.165, 0.84, 0.44, 1), opacity ${duration}ms cubic-bezier(0.165, 0.84, 0.44, 1)`,
  transitionDelay: `${delay}ms`,
  transform: 'translateY(-50px)',
});

drop.entering = () => ({
});

drop.entered = () => ({
  opacity: 1,
  transform: 'translateY(0px)',
});

drop.exiting = () => ({
  transform: 'translateY(50px)',
  opacity: 0,
});

drop.exited = () => ({
});

export default drop;
