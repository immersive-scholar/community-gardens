import React, { Fragment } from "react";
import PathToPicture from "util/PathToPicture";

const HousingInsecurityModel = {
  id: "housing-insecurity",
  title: "Housing Insecurity",
  link: "/garden/housing-insecurity",
  excerpt: (
    <Fragment>
      Students who have experienced <b>Housing Insecurity</b> are affected by
      the wind. Wind displaces leaves from the stem; the further the
      displacement the more severe the insecurity. These students care so much
      about their education that they are willing to sleep outside or in
      inhabitable spaces.
    </Fragment>
  ),
  headerImage: PathToPicture("plants", `housing-insecurity`),
  cta: "View"
};

export default HousingInsecurityModel;
