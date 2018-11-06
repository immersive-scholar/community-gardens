import React, { Fragment } from "react";
import PathToPicture from "util/PathToPicture";

const HousingInsecurityModel = {
  id: "housing-insecurity",
  title: "Housing Insecurity",
  link: "/garden/housing-insecurity",
  excerpt: (
    <Fragment>
      Students who experience <b>housing insecurity</b> are more affected by the
      wind.
    </Fragment>
  ),
  headerImage: PathToPicture("plants", `housing-insecurity`),
  cta: "View"
};

export default HousingInsecurityModel;
