import glamorous from "glamorous";

const SlideControllerDiv = glamorous.div({
  position: "fixed",
  display: "grid",
  gridTemplateColumns: "100px 100px",
  justifyItems: "center",
  alignItems: "center",
  bottom: 0,
  right: 0,
  background: "#000000",
  color: "#ffffff",
  padding: "20px",
  zIndex: 1,
  transition: "transform 300ms ease-out"
});

export { SlideControllerDiv };
