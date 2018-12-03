import React, { Fragment } from "react";
import PathToPicture from "util/PathToPicture";

const XmasCardModel = {
  id: "xmas-card",
  title: "Xmas Card",
  link: "/garden/xmas-card",
  excerpt: <Fragment>Holiday Card</Fragment>,
  headerImage: PathToPicture("plants", `winter-garden`),
  cta: "View"
};

export default XmasCardModel;
