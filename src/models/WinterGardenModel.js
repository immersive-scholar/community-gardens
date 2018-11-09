import React, { Fragment } from "react";
import PathToPicture from "util/PathToPicture";

const WinterGardenModel = {
  id: "winter-garden",
  title: "Winter Garden",
  link: "/garden/winter-garden",
  excerpt: (
    <Fragment>
      Students with a <b>lower security</b> score are drawn with winter colors.
    </Fragment>
  ),
  headerImage: PathToPicture("plants", `winter-garden`),
  cta: "View"
};

export default WinterGardenModel;
