import { css } from "glamor";
import glamorous from "glamorous";

const MarqueeWrapper = glamorous.div({
  position: "relative",
  maxHeight: "calc(100vh - 1rem)",
  overflow: "hidden",
});

const ShortMarqueeWrapper = glamorous.div({
  position: "relative",
  height: "40vh",
  maxHeight: "20rem",
  "@media screen and (min-width: 72em)": {
    height: "60vh",
  },
});

const CanvasWrapper = glamorous.div({
  position: "relative",
  top: 0,
  left: 0,
  width: "100%",
  "@media screen and (min-width: 72em)": {
    height: "56.25vw", // 9/16ths of the width
  },
});

const Arrow = glamorous.div({
  width: 0,
  height: 0,
  borderLeft: "1rem solid transparent",
  borderRight: "1rem solid transparent",
  borderTop: "1rem solid #dd4f90",
  cursor: "pointer",

  "&:hover": {
    borderTopColor: "#ec468a",
  },
});

const bounceAnimation = props => {
  const bounce = css.keyframes({
    "0%": {
      transform: "translateY(-5px)",
    },
    "50%": {
      transform: "translateY(5px)",
    },
    "100%": {
      transform: "translateY(-5px)",
    },
  });
  return {
    position: "absolute",
    bottom: "0.5rem",
    left: "calc(50% - 1rem)",
    zIndex: "101",
    animation: `${bounce} 3s infinite ease-in-out`,
  };
};

const BounceAnimation = glamorous.div(bounceAnimation);

const Darken = glamorous.div({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.3)",
});

const Lighten = glamorous.div({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "#dd4f90",
  opacity: 1,
  transition: "all 0.5s",
});

const Fader = glamorous.div({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  opacity: 1,
  transform: "scale(1)",
  transition: "all 0.5s",
});

const fadeOut = css({
  opacity: 0,
  transform: "scale(1.1)",
  transition: "all 0.5s",
});

const TextWrapper = glamorous.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  padding: "1rem",
});

const Absolute = glamorous.div({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
});

const titleStyles = css({
  "@media screen and (min-width: 72em)": {
    fontSize: "4rem",
  },
});

const subtitleStyles = css({
  marginTop: 0,
  marginBottom: ".5rem",
  "@media screen and (max-width: 71.997em)": {
    marginTop: "1rem",
  },
  "@media screen and (min-width: 72em)": {
    fontSize: "3rem",
  },
});

const miniSubtitle = css({
  marginTop: ".5rem",
  "@media screen and (min-width: 72em)": {
    fontSize: "1.2rem",
  },
});

export {
  MarqueeWrapper,
  ShortMarqueeWrapper,
  CanvasWrapper,
  TextWrapper,
  Darken,
  Lighten,
  Fader,
  Absolute,
  titleStyles,
  subtitleStyles,
  miniSubtitle,
  Arrow,
  BounceAnimation,
  fadeOut,
};
