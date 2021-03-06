import React, { Fragment } from "react";
import PathToPicture from "util/PathToPicture";

const RandomGardenModel = {
  id: "random-garden",
  title: "Mixed Seeds",
  link: "/gardens/random-garden",
  excerpt: <Fragment>A random sampling of NC State students.</Fragment>,
  headerImage: PathToPicture("plants", `random-garden`),
  cta: "View",
};

export default RandomGardenModel;
