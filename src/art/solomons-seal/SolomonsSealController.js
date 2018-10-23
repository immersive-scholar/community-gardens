import { Vector2, Vector3, Color } from "three-full";
import ColorFactory from "util/ColorFactory";
import BaseGUI from "gui/BaseGUI";
import PositionProps from "gui/props/PositionProps";
import StemProps from "gui/props/StemProps";
import LeafProps from "gui/props/LeafProps";
import LeafColorProps from "gui/props/LeafColorProps";
import BerryProps from "gui/props/BerryProps";
import WindProps from "gui/props/WindProps";

class SolomonsSealController extends BaseGUI {
  constructor(props) {
    super(props);

    const positionProps = new PositionProps();
    super.addProperty(positionProps);

    const stemProps = new StemProps();
    super.addProperty(stemProps);

    const leafProps = new LeafProps();
    super.addProperty(leafProps);

    const leafColorProps = new LeafColorProps();
    super.addProperty(leafColorProps);

    const windProps = new WindProps();
    super.addProperty(windProps);

    const berryProps = new BerryProps();
    super.addProperty(berryProps);
  }
}

export default SolomonsSealController;
