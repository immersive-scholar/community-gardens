import React, { Fragment } from "react";
import PathToPicture from "util/PathToPicture";

const HighGPAModel = {
  id: "high-gpa",
  title: "High GPA",
  link: "/gardens/high-gpa",
  excerpt: (
    <Fragment>
      Students with a <b>high GPA</b> are drawn with stars on their leaves.
    </Fragment>
  ),
  headerImage: PathToPicture("plants", `high-gpa`),
  cta: "View"
};

export default HighGPAModel;
