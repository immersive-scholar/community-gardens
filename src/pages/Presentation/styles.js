import glamorous from "glamorous";
import { css } from "glamor";

const PageWrapper = glamorous.div({
  position: "absolute",
  width: "100%",
  height: "100vh",
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
  alignItems: "center",
  justifyItems: "center",
  background: "#000"
});

const Empty = glamorous.div({});

const Wrapper = glamorous.div({
  position: "relative",
  width: "100%",
  height: "100%",
  display: "grid",
  alignItems: "center",
  justifyContent: "center"
});

const Circle = glamorous.div({
  position: "relative",
  background: "#ffffff",
  width: "80vh",
  height: "80vh",
  padding: "100px",
  color: "#000000",
  borderRadius: "50%",
  overflow: "hidden"
});

const blackBg = { ...css({ background: "#000000 !important" }) };

const PlateText = glamorous.h1({
  position: "relative",
  margin: "0 auto",
  fontSize: "100px",
  textAlign: "center",
  fontFamily: "Alegreya",
  // lineHeight: 1.8,
  "@media screen and (min-width: 10000px)": {
    fontSize: "200px",
    lineHeight: 1.8
  }
});

const BodyText = glamorous.h1({
  position: "relative",
  margin: "0 auto",
  fontSize: "50px",
  textAlign: "center",
  fontFamily: "Alegreya",
  // lineHeight: 1.8,
  "@media screen and (min-width: 10000px)": {
    fontSize: "100px",
    lineHeight: 1.8
  }
});

const Background = glamorous.div({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%"
});

const Caption = glamorous.div({
  position: "absolute",
  bottom: "0",
  width: "100%",
  margin: "0 auto",
  fontSize: "24px",
  color: "#ffffff",
  textAlign: "center"
});

export {
  Wrapper,
  PageWrapper,
  PlateText,
  BodyText,
  Empty,
  Circle,
  Background,
  blackBg,
  Caption
};
