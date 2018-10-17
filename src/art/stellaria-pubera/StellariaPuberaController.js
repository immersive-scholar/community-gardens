import BaseGUI from "gui/BaseGUI";
import AnimatedProps from "gui/props/AnimatedProps";
import PositionProps from "gui/props/PositionProps";
// import StemProps from "gui/props/StemProps";
// import LeafProps from "gui/props/LeafProps";
import LeafColorProps from "gui/props/LeafColorProps";
import PetalProps from "gui/props/PetalProps";

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
  }
}

export default StellariaPuberaController;
