import React, { Fragment } from "react";
import PathToPicture from "util/PathToPicture";

const EnergyOutgoingModel = {
  id: "energy-outgoing",
  title: "Energy Outgoing",
  link: "/garden/energy-outgoing",
  excerpt: (
    <Fragment>
      Students who have high <b>Energy Outgoing</b> scores have berries
      displaced from the stem. These students are working 30+ hours per week,
      have children, are searching for a job, or are pursuing their Masters or
      Doctoral degrees.
    </Fragment>
  ),
  headerImage: PathToPicture("plants", `energy-outgoing`),
  cta: "View"
};

export default EnergyOutgoingModel;
