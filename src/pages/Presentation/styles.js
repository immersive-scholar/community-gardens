import glamorous from "glamorous";
import { css } from "glamor";

const Center = glamorous.div({
  width: "100%",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "black",
});

const NCSUWrapper = glamorous.div({
  position: "absolute",
  width: "100%",
  height: "100vh",
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
  alignItems: "center",
  justifyItems: "center",
  background: "#000",
});

const PageWrapper = glamorous.div({
  width: "100%",
  height: "90vmin",
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "auto",
  gridTemplateRows: "1fr",
  alignItems: "center",
  justifyItems: "center",
  background: "#000",
});

const ColumnsGrid = glamorous.div({
  width: "100%",
  height: "auto",
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateRows: "1fr",
  gridAutoRows: "1fr",
  alignItems: "center",
  justifyItems: "center",
  background: "#000",
});

const Empty = glamorous.div({});

const Wrapper = glamorous.div({
  position: "relative",
  width: "100%",
  height: "100%",
  display: "grid",
  alignItems: "center",
  justifyContent: "center",
});

const LargeCircle = glamorous.div({
  position: "absolute",
  width: "90vmin",
  height: "90vmin",
  borderRadius: "50%",
  overflow: "hidden",
  transition: "opacity 0.3s",
});

const Circle = glamorous.div({
  position: "relative",
  background: "#ffffff",
  width: "100vmin",
  height: "auto",
  // width: "80vh",
  // height: "80vh",
  margin: "0 auto",
  padding: "1rem",
  color: "#000000",
  // borderRadius: "50%",
  overflow: "hidden",
});

const RowCircle = glamorous.div({
  position: "relative",
  background: "#ffffff",
  width: "18.75vmin",
  height: "18.75vmin",
  maxWidth: "100px",
  maxHeight: "100px",
  // width: "80vh",
  // height: "80vh",
  padding: "1rem",
  color: "#000000",
  borderRadius: "50%",
  overflow: "hidden",
});

const ChapterTitle = glamorous.div({
  position: "absolute",
  top: "15vmin",
  width: "75vmin",
  height: "75vmin",
  padding: "1rem",
  background: "none",
  border: "2px dashed white",
  borderRadius: "50%",
  overflow: "hidden",
});

const blackBg = { ...css({ background: "#000000 !important" }) };

const H1 = glamorous.h1({
  position: "relative",
  margin: "50% auto 0",
  fontSize: "70px",
  textAlign: "center",
  fontFamily: "Alegreya",
  lineHeight: 0,
});

const PlateText = glamorous.h1({
  position: "relative",
  margin: "0 auto",
  fontSize: "100px",
  textAlign: "center",
  fontFamily: "Alegreya",
  // lineHeight: 1.8,
  "@media screen and (min-width: 10000px)": {
    fontSize: "200px",
    lineHeight: 1.8,
  },
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
    lineHeight: 1.8,
  },
});

const Background = glamorous.div({
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  clipPath: "circle(50%)",
});

const Caption = glamorous.div({
  position: "relative",
  bottom: "0",
  width: "100%",
  margin: "0 auto",
  fontSize: "24px",
  color: "#ffffff",
  textAlign: "center",
});

export {
  Center,
  Wrapper,
  NCSUWrapper,
  PageWrapper,
  ColumnsGrid,
  PlateText,
  BodyText,
  Empty,
  LargeCircle,
  Circle,
  RowCircle,
  ChapterTitle,
  H1,
  Background,
  blackBg,
  Caption,
};
