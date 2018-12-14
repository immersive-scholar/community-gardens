import React, { Fragment } from "react";
import PathToPicture from "util/PathToPicture";

const SummerGardenModel = {
  id: "summer-garden",
  title: "Summer Garden",
  link: "/gardens/summer-garden",
  excerpt: (
    <Fragment>
      Students with a <b>high health</b> score are drawn with warm colors and
      grouped in the Summer Garden.
    </Fragment>
  ),
  headerImage: PathToPicture("plants", `summer-garden`),
  cta: "View"
};

export default SummerGardenModel;
