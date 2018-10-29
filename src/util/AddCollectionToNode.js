import transform from "lodash/transform";
import get from "lodash/get";

export default (collection, initialNode, propName = "id") =>
  transform(
    collection,
    (acc, item) => {
      acc[get(item, propName)] = item;
    },
    { ...initialNode }
  );
