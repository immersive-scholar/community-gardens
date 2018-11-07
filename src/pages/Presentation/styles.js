import glamorous from "glamorous";
import { css } from "glamor";
import typography from "util/typography";

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
  fontFamily: "Alegreya"
});

const Background = glamorous.div({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%"
});

export { PageWrapper, PlateText, Empty, Circle, Background, blackBg };
