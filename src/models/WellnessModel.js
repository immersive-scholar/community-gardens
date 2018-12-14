import React, { Fragment } from "react";
import PathToPicture from "util/PathToPicture";

const WellnessModel = {
  id: "wellness",
  title: "High Wellness",
  link: "/gardens/wellness",
  excerpt: (
    <Fragment>
      Students who have <b>high wellness</b> have polka dots on their leaves.
    </Fragment>
  ),
  headerImage: PathToPicture("plants", `wellness`),
  cta: "View",
};

export default WellnessModel;
