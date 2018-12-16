import { css } from "glamor";
import glamorous from "glamorous";

const MarqueeWrapper = glamorous.div({
  position: "relative",
  maxHeight: "calc(100vh - 1rem)",
  overflow: "hidden"
});

const ShortMarqueeWrapper = glamorous.div({
  position: "relative",
  height: "40vh",
  maxHeight: "20rem",
  "@media screen and (min-width: 72em)": {
    height: "60vh"
  }
});

const Darken = glamorous.div({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.3)"
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
  padding: "1rem"
});

const Absolute = glamorous.div({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%"
});

const titleStyles = css({
  "@media screen and (min-width: 72em)": {
    fontSize: "4rem"
  }
});

const subtitleStyles = css({
  marginBottom: 0,
  "@media screen and (max-width: 71.997em)": {
    marginTop: "1rem"
  },
  "@media screen and (min-width: 72em)": {
    fontSize: "3rem"
  }
});

export {
  MarqueeWrapper,
  ShortMarqueeWrapper,
  TextWrapper,
  Darken,
  Absolute,
  titleStyles,
  subtitleStyles
};
