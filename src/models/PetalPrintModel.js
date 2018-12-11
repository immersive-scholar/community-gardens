import React, { Fragment } from "react";
import PathToPicture from "util/PathToPicture";

const PetalPrintModel = {
  id: "petal-print",
  title: "Petal Print",
  link: "/garden/petal-print",
  excerpt: <Fragment>Petal Print</Fragment>,
  headerImage: PathToPicture("plants", `community-gardens-data`),
  cta: "View"
};

export default PetalPrintModel;
