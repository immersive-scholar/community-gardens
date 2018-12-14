import React, { Fragment } from "react";
import PathToPicture from "util/PathToPicture";

const DegreeModel = {
  id: "degree",
  title: "Degree",
  // link: "/gardens/degree",
  excerpt: (
    <Fragment>
      The <b>Degree</b> the student is pursing determines the plant height:
      taller plants are more senior degrees. The plant on the right is pursuing
      their Master's.
    </Fragment>
  ),
  headerImage: PathToPicture("plants", `degree`)
  // cta: "View"
};

export default DegreeModel;
