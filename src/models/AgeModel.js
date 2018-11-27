import React, { Fragment } from "react";
import PathToPicture from "util/PathToPicture";

const AgeModel = {
  id: "age",
  title: "Age",
  // link: "/garden/deagegree",
  excerpt: (
    <Fragment>
      The <b>age</b> of the student determines how many leaves or petals are on
      the plant. The plant on the left is 18, the middle 32, and the one on the
      right is 44.
    </Fragment>
  ),
  headerImage: PathToPicture("plants", `age`)
  // cta: "View"
};

export default AgeModel;
