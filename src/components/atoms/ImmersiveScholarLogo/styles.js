import glamorous from "glamorous";
import { css } from "glamor";
import typography from "util/typography";

import Microtiles from "util/Microtiles";

const LogoWrapperDiv = glamorous.div({
  position: "fixed",
  display: "grid",
  gridTemplateColumns: `1fr 1fr`,
  gridColumnGap: "10px",
  alignItems: "center",
  justifyContent: "center",
  fontSize: Microtiles.caption,
  bottom: 0,
  right: 0,
  padding: "30px",
  width: `${Microtiles.getWidth(4)}px`,
  //   height: `${Microtiles.getHeight(0.5)}px`,
  background: "#ffdc99",
  color: "#333333",
  textAlign: "center",
  zIndex: 3,
  transition: "transform 300ms ease-out",
  border: "15px solid #ffffff"
});

const Logo = glamorous.div({
  width: `${Microtiles.getWidth(1)}px`,
  margin: "0 auto",
  background: "#ffffff"
});

export { LogoWrapperDiv, Logo };
