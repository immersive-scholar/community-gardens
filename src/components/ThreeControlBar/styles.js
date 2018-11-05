import glamorous from "glamorous";
import { css } from "glamor";
import typography from "util/typography";

const ControlBar = glamorous.div({
  position: "fixed",
  display: "flex",
  alignItems: "center",
  bottom: 0,
  left: 0,
  width: "100%",
  height: typography.rhythm(1.5),
  background: "#000000",
  color: "#ffffff",
  zIndex: 1
});

const controlsGrid = css({
  display: "grid",
  alignItems: "center",
  gridTemplateColumns: `${typography.rhythm(1)} auto min-content min-content`,
  gridColumnGap: typography.rhythm(0.5)
});

export { ControlBar, controlsGrid };
