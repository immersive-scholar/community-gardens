import { css } from 'glamor';

const videoWrapper = css({
  opacity: 1,
  transition: 'opacity 0.3s ease-out',
});

const relative = css({
  position: 'relative',
});

const absolute = css({
  position: 'absolute',
  width: '100%',
  top: 0,
  left: 0,
  zIndex: 1,
});

const img = css({
  display: 'block',
  marginBottom: 0,
});

const pointerless = css({
  pointerEvents: 'none',
});

export { videoWrapper, relative, absolute, img, pointerless };
