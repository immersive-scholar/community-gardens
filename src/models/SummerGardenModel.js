import React, { Fragment } from "react";
import PathToPicture from "util/PathToPicture";

const summerGardenModel = {
  id: "summer-garden",
  title: "Summer Garden",
  link: "/garden/summer-garden",
  excerpt: (
    <Fragment>
      Students with a <b>high health</b> score are drawn with summer colors.
    </Fragment>
  ),
  headerImage: PathToPicture("plants", `summer-garden`),
  cta: "View"
};

export default summerGardenModel;
