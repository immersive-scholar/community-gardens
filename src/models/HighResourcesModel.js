import React, { Fragment } from "react";
import PathToPicture from "util/PathToPicture";

const HighResourcesModel = {
  id: "resourced",
  title: "High Resources",
  link: "/garden/resourced",
  excerpt: (
    <Fragment>
      Students who have <b>high resources</b> have thicker stems.
    </Fragment>
  ),
  headerImage: PathToPicture("plants", `high-resources`),
  cta: "View"
};

export default HighResourcesModel;
