import { Vector2, Vector3, Color } from "three-full";
import ColorSampler from "util/ColorSampler";
import BaseGUI from "gui/BaseGUI";
import PositionProps from "gui/props/PositionProps";
// import StemProps from "gui/props/StemProps";
// import LeafProps from "gui/props/LeafProps";
// import LeafColorProps from "gui/props/LeafColorProps";

class StellariaPuberaController extends BaseGUI {
  constructor(props) {
    super(props);

    const positionProps = new PositionProps();
    super.addProperty(positionProps);

    // const stemProps = new StemProps();
    // super.addProperty(stemProps);

    // const leafProps = new LeafProps();
    // super.addProperty(leafProps);

    // const leafColorProps = new LeafColorProps();
    // super.addProperty(leafColorProps);
  }
}

export default StellariaPuberaController;
