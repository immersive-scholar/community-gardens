import BaseGUI from "gui/BaseGUI";
import AnimatedProps from "gui/props/AnimatedProps";
import PositionProps from "gui/props/PositionProps";
import LeafColorProps from "gui/props/LeafColorProps";
import PetalProps from "gui/props/PetalProps";
import WindProps from "gui/props/WindProps";
// import StemProps from "gui/props/StemProps";
// import LeafProps from "gui/props/LeafProps";
// import WindProps from "gui/props/WindProps";

class StellariaPuberaController extends BaseGUI {
  constructor(props) {
    super(props);

    const animatedProps = new AnimatedProps();
    super.addProperty(animatedProps);

    const positionProps = new PositionProps();
    super.addProperty(positionProps);

    // const leafProps = new LeafProps();
    // super.addProperty(leafProps);

    const leafColorProps = new LeafColorProps();
    super.addProperty(leafColorProps);

    const petalProps = new PetalProps();
    super.addProperty(petalProps);

    const windProps = new WindProps();
    super.addProperty(windProps);
  }
}

export default StellariaPuberaController;
