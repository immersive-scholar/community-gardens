import React, { Fragment } from "react";
import PathToPicture from "util/PathToPicture";

const FoodInsecurityModel = {
  id: "food-insecurity",
  title: "Food Insecurity",
  link: "/gardens/food-insecurity",
  excerpt: (
    <Fragment>
      Students who experience <b>Food Insecurity</b> have berries drawn as
      wireframes. Their berries are hollow. Some of these students do not eat
      for an entire day.
    </Fragment>
  ),
  headerImage: PathToPicture("plants", `food-insecurity`),
  cta: "View"
};

export default FoodInsecurityModel;
