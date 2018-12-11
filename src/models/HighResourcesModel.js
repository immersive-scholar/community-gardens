import React, { Fragment } from "react";
import PathToPicture from "util/PathToPicture";

const HighResourcesModel = {
  id: "resourced",
  title: "High Incoming Resources",
  link: "/garden/resourced",
  excerpt: (
    <Fragment>
      Students who have <b>high incoming resources</b>, such as grants or an
      employer who pays for their tuition, have thicker stems.
    </Fragment>
  ),
  headerImage: PathToPicture("plants", `high-resources`),
  cta: "View"
};

export default HighResourcesModel;
