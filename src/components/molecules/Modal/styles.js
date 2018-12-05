import { css } from "glamor";

const modalCover = css({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 1001, // This must be at a higher index to the rest of your page content
  transform: "translateZ(0)",
  backgroundColor: "rgba(#000, 0.15)",
  "@media screen and (min-width: 48em)": {
    zIndex: 100
  }
});

const modal = css({
  position: "fixed",
  top: 0,
  left: 0,
  margin: "1rem",
  width: "calc(100% - 2rem)",
  height: "calc(100% - 2rem)",
  padding: "2.5rem 0 1.5rem",
  backgroundColor: "#ffffff",
  boxShadow: "0 0 10px 3px rgba(0, 0, 0, 0.1)",

  "@media screen and (min-width: 48em)": {
    left: "50%",
    top: "50%",
    height: "100%",
    margin: "0",
    transform: "translate(-50%, -50%)",
    maxWidth: "30em",
    maxHeight: "calc(100% - 1em)"
  }
});

const contentWrapper = css({
  position: "relative",
  width: "100%",
  height: "100%",
  overflowY: "auto",
  WebkitOverflowScrolling: "touch"
});

const modalClose = css({
  position: "absolute",
  top: 0,
  right: 0,
  padding: "1rem",
  lineHeight: 1,
  background: "#f6f6f7",
  border: 0,
  boxShadow: 0,
  cursor: "pointer"
});

const closeIcon = css({
  width: "1rem",
  height: "1rem",
  fill: "transparent",
  stroke: "black",
  strokeLinecap: "round",
  strokeWidth: 2
});

const modalBody = css({
  margin: "0 2rem",
  paddingTop: ".25em"
});

export { modalCover, modal, contentWrapper, modalClose, closeIcon, modalBody };
