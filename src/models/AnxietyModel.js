import React, { Fragment } from "react";
import PathToPicture from "util/PathToPicture";

const AnxietyModel = {
  id: "anxiety",
  title: "Anxiety",
  // link: "/garden/anxiety",
  excerpt: (
    <Fragment>
      Students who indicate <b>high anxiety</b> are drawn with angular lines in
      their stems.
    </Fragment>
  ),
  headerImage: PathToPicture("plants", `anxiety`)
  // cta: "View"
};

export default AnxietyModel;
