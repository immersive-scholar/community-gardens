import { Vector2, Vector3, Color } from "three-full";
import ColorSampler from "util/ColorSampler";
import PositionProps from "gui/PositionProps";
import BaseGUI from "gui/BaseGUI";

class StellariaPuberaController extends BaseGUI {
  constructor(props) {
    super(props);
    const positionProps = new PositionProps();
    super.addProperty(positionProps);
  }
}

export default StellariaPuberaController;
