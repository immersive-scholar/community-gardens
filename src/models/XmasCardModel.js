import React, { Fragment } from "react";
import PathToPicture from "util/PathToPicture";

const XmasCardModel = {
  id: "holiday-card",
  title: "Holiday Card",
  link: "/gardens/holiday-card",
  excerpt: <Fragment>Holiday Card</Fragment>,
  headerImage: PathToPicture("plants", `xmas`),
  cta: "View",
};

export default XmasCardModel;
