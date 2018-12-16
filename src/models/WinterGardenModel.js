import React, { Fragment } from "react";
import PathToPicture from "util/PathToPicture";

const WinterGardenModel = {
  id: "winter-garden",
  title: "Winter Garden",
  link: "/gardens/winter-garden",
  excerpt: (
    <Fragment>
      Students with a <b>lower health</b> score drawn with cooler colors and
      grouped in the Winter Garden.
    </Fragment>
  ),
  headerImage: PathToPicture("plants", `winter-garden`),
  cta: "View"
};

export default WinterGardenModel;
