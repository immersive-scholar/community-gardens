import glamorous from "glamorous";
import { css } from "glamor";
import typography from "util/typography";

const ControlBarDiv = glamorous.div({
  position: "fixed",
  display: "flex",
  alignItems: "center",
  bottom: 0,
  left: 0,
  width: "100%",
  height: typography.rhythm(1.5),
  background: "#000000",
  color: "#ffffff",
  zIndex: 1,
  transition: "transform 300ms ease-out"
});

const container = css({
  width: "100%",
  maxWidth: "80rem",
  margin: "0 auto",
  padding: "4rem 2rem",
  textAlign: "left"
});

const stateOpen = css({
  transform: "translateY(-136px)",
  "@media screen and (min-width: 720px)": {
    transform: "translateY(-48px)"
  }
});

const controlsGrid = css({
  display: "grid",
  gridTemplateColumns: `${typography.rhythm(1)} auto min-content min-content`,
  gridColumnGap: typography.rhythm(0.5),
  alignItems: "center"
});

const OptionsDiv = glamorous.div({
  position: "absolute",
  width: "100%",
  top: typography.rhythm(1.5),
  height: typography.rhythm(6),
  display: "grid",
  gridTemplateRows: `max-content max-content`,
  gridRowGap: typography.rhythm(0.5),
  alignItems: "center",
  paddingTop: typography.rhythm(0.25),
  background: "#000000",
  "@media screen and (min-width: 720px)": {
    height: typography.rhythm(1.5),
    paddingTop: 0,
    gridTemplateColumns: `max-content max-content`,
    gridColumnGap: typography.rhythm(0.5)
  }
});

export { ControlBarDiv, controlsGrid, OptionsDiv, stateOpen, container };
