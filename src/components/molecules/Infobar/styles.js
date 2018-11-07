import glamorous from "glamorous";
import { css } from "glamor";
import typography from "util/typography";

import Microtiles from "util/Microtiles";

const SidebarDiv = glamorous.div({
  position: "fixed",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "start",
  fontSize: Microtiles.caption,
  top: 0,
  right: 0,
  padding: "60px 120px",
  width: `${Microtiles.getWidth(4)}px`,
  height: "100vh",
  background: "#ffce72",
  color: "#000000",
  zIndex: 2,
  border: "30px solid #ffffff"
});

const Title = glamorous.h2({
  fontSize: Microtiles.h2,
  color: "inherit"
});

const P = glamorous.p({
  fontSize: Microtiles.body,
  color: "inherit"
});

export { SidebarDiv, Title, P };
