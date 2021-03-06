// import { css } from 'glamor';

const wrapper = {
  position: "relative",
  overflow: "hidden",
  minHeight: "1px",
};

const absoluteWrapper = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

const placeholder = {
  position: "relative",
  top: 0,
  left: 0,
  width: "100%",
  paddingTop: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  minHeight: "1px",
};

const placeholder16x9 = {
  paddingTop: "56%",
};

const placeholder3x4 = {
  paddingTop: "75%",
};

const placeholder3x1 = {
  paddingTop: "33%",
};

const placeholder1x1 = {
  paddingTop: "100%",
};

const placeholderVis = {
  // 12288 / 768
  paddingTop: "6.25%",
};

const placeholderLoaded = {
  display: "none",
};

const image = {
  position: "relative",
  display: "none",
  width: "100%",
  marginBottom: 0,
  // clipPath: 'polygon(0% 0%, 100% 0%, 0% 100%, -100% 100%)',
  // transition: 'all 1s ease-out',
};

const imageLoaded = {
  display: "block",
  // clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
};

const base = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  transform: "translateX(0%)",
  transition: "transform 1s ease-out",
};

const baseLoaded = {
  transform: "translateX(100%)",
};

const hilite = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  transform: "translateX(0%)",
  transition: "transform 1s ease-out",
};

const hiliteLoaded = {
  transform: "translateX(-100%)",
};

export {
  wrapper,
  absoluteWrapper,
  placeholder,
  placeholder16x9,
  placeholder3x1,
  placeholder3x4,
  placeholder1x1,
  placeholderVis,
  placeholderLoaded,
  image,
  imageLoaded,
  base,
  baseLoaded,
  hilite,
  hiliteLoaded,
};
