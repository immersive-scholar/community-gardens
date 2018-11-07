import glamorous from "glamorous";
import { css } from "glamor";
import typography from "util/typography";

import Microtiles from "util/Microtiles";

const LogoWrapperDiv = glamorous.div({
  position: "fixed",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  fontSize: Microtiles.caption,
  bottom: 0,
  right: 0,
  padding: "10px",
  width: Microtiles.getWidth(8),
  //   height: Microtiles.getHeight(0.5),
  background: "#000000",
  color: "#ffffff",
  zIndex: 2,
  transition: "transform 300ms ease-out",
  border: "1px solid black"
});

const Logo = glamorous.div({
  width: Microtiles.getWidth(1),
  background: "#ffffff"
});

export { LogoWrapperDiv, Logo };
