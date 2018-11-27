import { css } from "glamor";
import typography from "../../utils/typography";

const topNavWrapper = css({
  position: "sticky",
  top: 0,
  zIndex: 99
});

const topNav = css({
  position: "absolute",
  right: 0,
  width: typography.rhythm(2),
  padding: `${typography.rhythm(0.125)} ${typography.rhythm(0.25)}`,
  background: "white"
});

export { topNavWrapper, topNav };
