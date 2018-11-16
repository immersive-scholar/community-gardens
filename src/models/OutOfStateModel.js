import React, { Fragment } from "react";
import PathToPicture from "util/PathToPicture";

const OutOfStateModel = {
  id: "out-of-state",
  title: "Out of State",
  // link: "/garden/out-of-state",
  excerpt: (
    <Fragment>
      Students who come from <b>out of state</b> have leaves with topographical
      maps drawn on them.
    </Fragment>
  ),
  headerImage: PathToPicture("plants", `out-of-state`)
  // cta: "View"
};

export default OutOfStateModel;
