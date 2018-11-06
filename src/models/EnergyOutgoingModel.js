import React, { Fragment } from "react";
import PathToPicture from "util/PathToPicture";

const EnergyOutgoingModel = {
  id: "energy-outgoing",
  title: "Energy Outgoing",
  link: "/garden/energy-outgoing",
  excerpt: (
    <Fragment>
      Students who have high <b>Energy Outgoing</b> scores have berries
      displaced from the stem.
    </Fragment>
  ),
  headerImage: PathToPicture("plants", `summer-garden`),
  cta: "View"
};

export default EnergyOutgoingModel;
