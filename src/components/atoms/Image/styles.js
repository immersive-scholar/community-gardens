// import { css } from 'glamor';

const wrapper = {
  position: "relative",
  overflow: "hidden",
  minHeight: "1px"
};

const placeholder = {
  position: "relative",
  top: 0,
  left: 0,
  width: "100%",
  paddingTop: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  minHeight: "1px"
};

const placeholder16x9 = {
  paddingTop: "56%"
};

const placeholderLoaded = {
  display: "none"
};

const image = {
  position: "relative",
  display: "none",
  width: "100%",
  marginBottom: 0
  // clipPath: 'polygon(0% 0%, 100% 0%, 0% 100%, -100% 100%)',
  // transition: 'all 1s ease-out',
};

const imageLoaded = {
  display: "block"
  // clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
};

const base = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  transform: "translateX(0%)",
  transition: "transform 1s ease-out"
};

const baseLoaded = {
  transform: "translateX(100%)"
};

const hilite = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  transform: "translateX(0%)",
  transition: "transform 1s ease-out"
};

const hiliteLoaded = {
  transform: "translateX(-100%)"
};

export {
  wrapper,
  placeholder,
  placeholder16x9,
  placeholderLoaded,
  image,
  imageLoaded,
  base,
  baseLoaded,
  hilite,
  hiliteLoaded
};
