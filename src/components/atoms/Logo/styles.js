import glamorous from "glamorous";

import Microtiles from "util/Microtiles";

const LogoDiv = glamorous.div({
  width: `${Microtiles.getWidth(1)}px`,
  height: `${Microtiles.getWidth(1)}px`,
  padding: "30px",
  alignSelf: "center",
  background: "#c69c6d",
  borderRadius: "50%",
  overflow: "hidden",
  border: "30px solid #c69c6d"
});

export { LogoDiv };
