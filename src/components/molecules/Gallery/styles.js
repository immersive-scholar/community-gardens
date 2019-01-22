import { css } from "glamor";
import glamorous from "glamorous";

const gallery = css({
  padding: "1rem 0",
  display: "grid",
  gridGap: "1rem 0",
  gridTemplateColumns: "1rem 1fr 1rem",
  alignContent: "start",
});

const wrapper = css({
  gridColumn: "2 / -2",
});

const full = css({
  gridColumn: "1 / -1",
});

const hs = css({
  display: "grid",
  gridGap: ".5rem",
  gridTemplateColumns: "35vw",
  gridTemplateRows: "74vw",
  gridAutoFlow: "column",
  gridAutoColumns: "35vw",
  overflowX: "scroll",
  scrollSnapType: "x proximity",
  "&::before": {
    content: "",
    width: "1rem",
  },
  "&::after": {
    content: "",
    width: "1rem",
  },
  "@media screen and (min-width: 72em)": {
    gridTemplateRows: "41vw",
  },
});

const item = css({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  scrollSnapAlign: "center",
  padding: 0,
});

const ButtonWrapper = glamorous.div({
  display: "grid",
  width: "100%",
  "@media screen and (min-width: 72em)": {
    gridTemplateColumns: "50% 50%",
    gridColumnGap: "1px",
  },
});

export { gallery, wrapper, full, hs, item, ButtonWrapper };
