import { css } from "glamor";

const gallery = css({
  padding: "1rem 0",
  display: "grid",
  gridGap: "1rem 0",
  gridTemplateColumns: "1rem 1fr 1rem",
  alignContent: "start"
});

const wrapper = css({
  gridColumn: "2 / -2"
});

const full = css({
  gridColumn: "1 / -1"
});

const hs = css({
  display: "grid",
  gridGap: ".5rem",
  gridTemplateColumns: "35vw",
  gridTemplateRows: "35vw",
  gridAutoFlow: "column",
  gridAutoColumns: "35vw",
  overflowX: "scroll",
  scrollSnapType: "x proximity",
  "&::before": {
    content: "",
    width: "1rem"
  },
  "&::after": {
    content: "",
    width: "1rem"
  }
});

const item = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  scrollSnapAlign: "center",
  padding: 0
});

export { gallery, wrapper, full, hs, item };
