import React, { Fragment } from "react";
import PathToPicture from "util/PathToPicture";

const FirstGenerationModel = {
  id: "first-generation",
  title: "First Generation",
  link: "/garden/first-generation",
  excerpt: (
    <Fragment>
      <b>First Generation</b> students have mazes on their stems. They have an
      extra layer of challenges to navigate, often without guides or support.
    </Fragment>
  ),
  headerImage: PathToPicture("plants", `first-generation`),
  cta: "View"
};

export default FirstGenerationModel;
